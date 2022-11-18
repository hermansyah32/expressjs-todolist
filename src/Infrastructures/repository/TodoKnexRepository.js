import InvariantError from '../../Commons/exceptions/InvariantError';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import IndexSchema from '../../Domains/IndexSchema';
import CreatedTodo from '../../Domains/todos/schemas/CreatedTodo';
import CreateTodo from '../../Domains/todos/schemas/CreateTodo';
import TodoRepository from '../../Domains/todos/TodoRepository';
import dayjs from 'dayjs';
import DatabaseError from '../../Commons/exceptions/DatabaseError';

export default class TodoKnexRepository extends TodoRepository {
  /**
   * Constructor
   * @param {import("knex").Knex} knex
   */
  constructor(knex) {
    super();
    this._knex = knex;
  }

  /**
   * Get index page and filter
   * @param {IndexSchema} payload
   */
  async index(payload) {
    if (payload instanceof IndexSchema === false)
      throw new InvariantError('Invalid payload schema');

    try {
      const result = await this._knex(TodoRepository.tableName)
        .whereNull('deleted_at')
        .paginate({
          perPage: payload.count,
          currentPage: payload.page,
        });
      return result;
    } catch (error) {
      throw new DatabaseError(error.message, {
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
        sql: error.sql,
      });
    }
  }

  /**
   * Get index trashed page and filter
   * @param {IndexSchema} payload
   */
  async indexTrashed(payload) {
    if (payload instanceof IndexSchema === false)
      throw new InvariantError('Invalid payload schema');

    try {
      const result = await this._knex(TodoRepository.tableName)
        .whereNotNull('deleted_at')
        .paginate({
          perPage: payload.count,
          currentPage: payload.page,
        });
      return result;
    } catch (error) {
      throw new DatabaseError(error.message, {
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
        sql: error.sql,
      });
    }
  }

  /**
   * Create new resources
   * @param {CreateTodo} payload
   */
  async store(payload) {
    if (payload instanceof CreateTodo === false)
      throw new InvariantError('Invalid payload schema');

    try {
      await this._knex(TodoRepository.tableName).insert(payload);
      return payload;
    } catch (error) {
      throw new DatabaseError(error.message, {
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
        sql: error.sql,
      });
    }
  }

  /**
   * Find resources by column and value
   * @param {string} column
   * @param {string} value
   */
  async getBy(column, value) {
    try {
      const result = await this._knex(TodoRepository.tableName)
        .where(column, value)
        .whereNull('deleted_at');
      if (result.length < 1) throw new NotFoundError('User data not found');
      
      return new CreatedTodo(result[0]);
    } catch (error) {
      if (error instanceof NotFoundError === false) {
        throw new DatabaseError(error.message, {
          sqlState: error.sqlState,
          sqlMessage: error.sqlMessage,
          sql: error.sql,
        });
      }
      throw error;
    }
  }

  /**
   * Find trashed resources by column and value
   * @param {string} column
   * @param {string} value
   */
  async getTrashedBy(column, value) {
    try {
      const result = await this._knex(TodoRepository.tableName)
        .where(column, value)
        .whereNotNull('deleted_at');
      if (result.length < 1) throw new NotFoundError('User data not found');

      return new CreatedTodo(result[0]);
    } catch (error) {
      if (error instanceof NotFoundError === false) {
        throw new DatabaseError(error.message, {
          sqlState: error.sqlState,
          sqlMessage: error.sqlMessage,
          sql: error.sql,
        });
      }
      throw error;
    }
  }

  /**
   * Update resources by column and value
   * @param {string} column
   * @param {string} value
   * @param {Object} payload
   */
  async updateBy(column, value, payload) {
    try {
      const createdTodo = await this._knex(TodoRepository.tableName)
        .where(column, value)
        .whereNull('deleted_at');
      if (createdTodo.length < 1)
        throw new NotFoundError('Todo data not found');
      const updatedTodo = new CreatedTodo(createdTodo[0], true);
      Object.assign(updatedTodo, payload);

      await this._knex(TodoRepository.tableName)
        .where(column, value)
        .update(updatedTodo);

      return updatedTodo;
    } catch (error) {
      if (error instanceof NotFoundError === false) {
        throw new DatabaseError(error.message, {
          sqlState: error.sqlState,
          sqlMessage: error.sqlMessage,
          sql: error.sql,
        });
      }
      throw error;
    }
  }

  /**
   * Restore resources by column and value
   * @param {string} column
   * @param {string} value
   */
  async restoreBy(column, value) {
    try {
      const todoResult = await this._knex(TodoRepository.tableName)
        .where(column, value)
        .whereNotNull('deleted_at');
      if (todoResult.length < 1) throw new NotFoundError('Todo data not found');
      const createdTodo = new CreatedTodo(todoResult[0], true);
      createdTodo.deleted_at = null;

      await this._knex(TodoRepository.tableName)
        .where(column, value)
        .update({ deleted_at: createdTodo.deleted_at });

      return createdTodo;
    } catch (error) {
      if (error instanceof NotFoundError === false) {
        throw new DatabaseError(error.message, {
          sqlState: error.sqlState,
          sqlMessage: error.sqlMessage,
          sql: error.sql,
        });
      }
      throw error;
    }
  }

  /**
   * Move resources by column and value to trash bin.
   * @param {string} column
   * @param {string} value
   */
  async destroyBy(column, value) {
    try {
      const createdTodo = await this._knex(TodoRepository.tableName)
        .where(column, value)
        .whereNull('deleted_at');
      if (createdTodo.length < 1)
        throw new NotFoundError('Todo data not found');

      const deletedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
      await this._knex(TodoRepository.tableName)
        .where(column, value)
        .update({ deleted_at: deletedAt });
    } catch (error) {
      if (error instanceof NotFoundError === false) {
        throw new DatabaseError(error.message, {
          sqlState: error.sqlState,
          sqlMessage: error.sqlMessage,
          sql: error.sql,
        });
      }
      throw error;
    }
  }

  /**
   * Delete resources by column and value permanently.
   * @param {string} column
   * @param {string} value
   */
  async permanentDestroyBy(column, value) {
    try {
      const createdTodo = await this._knex(TodoRepository.tableName)
        .where(column, value)
        .whereNotNull('deleted_at');
      if (createdTodo.length < 1)
        throw new NotFoundError('User data not found');

      await this._knex(TodoRepository.tableName).where(column, value).delete();
    } catch (error) {
      if (error instanceof NotFoundError === false) {
        throw new DatabaseError(error.message, {
          sqlState: error.sqlState,
          sqlMessage: error.sqlMessage,
          sql: error.sql,
        });
      }
      throw error;
    }
  }
}

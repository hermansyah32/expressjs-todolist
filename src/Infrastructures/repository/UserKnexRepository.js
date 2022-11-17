import InvariantError from '../../Commons/exceptions/InvariantError';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import IndexSchema from '../../Domains/IndexSchema';
import RegisteredUser from '../../Domains/users/schemas/RegisteredUser';
import RegisterUser from '../../Domains/users/schemas/RegisterUser';
import UserRepository from '../../Domains/users/UserRepository';
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import BcryptPasswordHash from '../security/BcryptPasswordHash';
import DatabaseError from '../../Commons/exceptions/DatabaseError';
import UserWithPassword from '../../Domains/users/schemas/UserWithPassword';

export default class UserKnexRepository extends UserRepository {
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
      const result = await this._knex(UserRepository.tableName)
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
      const result = await this._knex(UserRepository.tableName)
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
   * @param {RegisterUser} payload
   */
  async store(payload) {
    if (payload instanceof RegisterUser === false)
      throw new InvariantError('Invalid payload schema');

    try {
      const passwordHash = new BcryptPasswordHash(bcrypt);
      payload.password = await passwordHash.hash(payload.password);

      await this._knex(UserRepository.tableName).insert(payload);
      return new RegisteredUser(payload);
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
      const result = await this._knex(UserRepository.tableName)
        .where(column, value)
        .whereNull('deleted_at');
      if (result.length < 1) throw new NotFoundError('User data not found');

      return new RegisteredUser(result[0]);
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
   * Find password by column and value
   * @param {string} column
   * @param {string} value
   */
   async getPasswordBy(column, value) {
    try {
      const result = await this._knex(UserRepository.tableName)
        .where(column, value)
        .whereNull('deleted_at');
      if (result.length < 1) throw new NotFoundError('User data not found');

      return new PasswordUser(result[0]);
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
   * Find password by username or email
   * @param {string} username
   * @param {string} email
   */
   async getWithPassword(username, email) {
    try {
      const result = await this._knex(UserRepository.tableName)
        .where('username', username)
        .orWhere('email', email)
        .whereNull('deleted_at');
      if (result.length < 1) throw new NotFoundError('User data not found');

      return new UserWithPassword(result[0]);
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
      const result = await this._knex(UserRepository.tableName)
        .where(column, value)
        .whereNotNull('deleted_at');
      if (result.length < 1) throw new NotFoundError('User data not found');

      return new RegisteredUser(result[0]);
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
      const registeredUser = await this._knex(UserRepository.tableName)
        .where(column, value)
        .whereNull('deleted_at');
      if (registeredUser.length < 1)
        throw new NotFoundError('User data not found');
      const updateUser = new RegisteredUser(registeredUser[0], true);
      updateUser.assign(payload);

      await this._knex(UserRepository.tableName)
        .where(column, value)
        .update(updateUser);

      return updateUser;
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
      const userResult = await this._knex(UserRepository.tableName).where(
        column,
        value
      );
      if (userResult.length < 1) throw new NotFoundError('User data not found');
      const registeredUser = new RegisteredUser(userResult[0], true);
      registeredUser.deleted_at = null;

      await this._knex(UserRepository.tableName)
        .where(column, value)
        .update({ deleted_at: registeredUser.deleted_at });
      return registeredUser;
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
      const registeredUser = await this._knex(UserRepository.tableName).where(
        column,
        value
      );
      if (registeredUser.length < 1)
        throw new NotFoundError('User data not found');

      const deletedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
      await this._knex(UserRepository.tableName)
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
      const registeredUser = await this._knex(UserRepository.tableName)
        .where(column, value)
        .whereNotNull('deleted_at');
      if (registeredUser.length < 1)
        throw new NotFoundError('User data not found');

      await this._knex(UserRepository.tableName).where(column, value).del();
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

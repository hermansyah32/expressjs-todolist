import CreateTodo from './schemas/CreateTodo';
import CreatedTodo from './schemas/CreatedTodo';

export default class TodoRepository {
  static tableName = 'todos';

  async index(payload) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async indexTrashed(payload) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Create new resources
   * @param {CreateTodo} payload
   */
  async store(payload) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Find resources by column and value
   * @param {string} column
   * @param {string} value
   */
  async getBy(column, value) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Find trashed resources by column and value
   * @param {string} column
   * @param {string} value
   */
  async getTrashedBy(column, value) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Update resources by column and value
   * @param {string} column
   * @param {string} value
   * @param {CreatedTodo} payload
   */
  async updateBy(column, value, payload) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Restore resources by column and value
   * @param {string} column
   * @param {string} value
   */
  async restoreBy(column, value) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Move resources by column and value to trash bin.
   * @param {string} column
   * @param {string} value
   */
  async destroyBy(column, value) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Delete resources by column and value permanently.
   * @param {string} column
   * @param {string} value
   */
  async permanentDestroyBy(column, value) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

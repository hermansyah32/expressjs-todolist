import IndexSchema from '../IndexSchema';
import RegisterUser from './schemas/RegisterUser';
import RegisteredUser from './schemas/RegisteredUser';

export default class UserRepository {
  static tableName = 'users';

  /**
   * Get index page and filter
   * @param {IndexSchema} payload
   */
  async index(payload) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Get index trashed page and filter.
   * @param {IndexSchema} payload
   */
  async indexTrashed(payload) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Create new resources
   * @param {RegisterUser} payload
   */
  async store(payload) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Find resources by column and value
   * @param {string} column
   * @param {string} value
   */
  async getBy(column, value) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Find password by column and value
   * @param {string} column
   * @param {string} value
   */
   async getPasswordBy(column, value) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Find trashed resources by column and value
   * @param {string} column
   * @param {string} value
   */
  async getTrashedBy(column, value) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Update resources by column and value
   * @param {string} column
   * @param {string} value
   * @param {RegisteredUser} payload
   */
  async updateBy(column, value, payload) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Restore resources by column and value
   * @param {string} column
   * @param {string} value
   */
  async restoreBy(column, value) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Move resources by column and value to trash bin.
   * @param {string} column
   * @param {string} value
   */
  async destroyBy(column, value) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Delete resources by column and value permanently.
   * @param {string} column
   * @param {string} value
   */
  async permanentDestroyBy(column, value) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

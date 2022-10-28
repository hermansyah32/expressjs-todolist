import GeneratedToken from './schemas/GeneratedToken';

export default class TokenRepository {
  static tableName = 'token';

  /**
   * Create new resources
   * @param {GeneratedToken} payload
   */
  async store(payload) {
    throw new Error('TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Find resources by token
   * @param {string} token
   */
  async getBy(token) {
    throw new Error('TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  /**
   * Find resources by token
   * @param {string} token
   */
  async destroyBy(token) {
    throw new Error('TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

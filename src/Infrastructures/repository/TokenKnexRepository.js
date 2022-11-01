import GeneratedToken from '../../Domains/authentications/schemas/GeneratedToken';
import TokenRepository from '../../Domains/authentications/TokenRepository';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import InvariantError from '../../Commons/exceptions/InvariantError';
import DatabaseError from '../../Commons/exceptions/DatabaseError';

export default class TokenKnexRepository extends TokenRepository {
  /**
   * Constructor
   * @param {import("knex").Knex} knex
   */
  constructor(knex) {
    super();
    this._knex = knex;
  }

  /**
   * Create new resources
   * @param {GeneratedToken} payload
   */
  async store(payload) {
    if (payload instanceof GeneratedToken === false)
      throw new InvariantError('TOKEN_KNEX_REPOSITORY.INVALID_SCHEMA');

    try {
      await this._knex(TokenRepository.tableName).insert(payload);
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
   * Find resources by token
   * @param {string} token
   */
  async getBy(token) {
    try {
      const result = await this._knex(TokenRepository.tableName).where(
        'token',
        token
      );
      if (result.length === 0)
        throw new NotFoundError('Token credential is not found');
      return result[0];
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
   * Find resources by token
   * @param {string} token
   */
  async destroyBy(token) {
    try {
      await this._knex(TokenRepository.tableName).where('token', token).del();
    } catch (error) {
      throw new DatabaseError(error.message, {
        sqlState: error.sqlState,
        sqlMessage: error.sqlMessage,
        sql: error.sql,
      });
    }
  }
}

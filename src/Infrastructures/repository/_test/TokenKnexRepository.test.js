import knex from 'knex';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import GeneratedToken from '../../../Domains/authentications/schemas/GeneratedToken';
import TokenRepository from '../../../Domains/authentications/TokenRepository';
import { testing } from '../../database/knexfile';
import { testing as testingEnv } from '../../../../tests/knexfileTestHelper';
import TokenKnexRepository from '../TokenKnexRepository';
import DatabaseError from '../../../Commons/exceptions/DatabaseError';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';

describe('TokenKnexRepository', () => {
  afterEach(async () => {
    await knex(testing)(TokenRepository.tableName).truncate();
  });

  describe('store function', () => {
    it('should running correctly', async () => {
      // Arrange
      const tokenSchema = new GeneratedToken({ token: 'token' });
      const knexConfig = knex(testing);
      const tokenRepository = new TokenKnexRepository(knexConfig);
      // Action
      await tokenRepository.store(tokenSchema);
      // Assert
      const result = await knexConfig(TokenRepository.tableName).where(
        'token',
        tokenSchema.token
      );
      expect(result.length).toEqual(1);
      expect(result[0].token).toEqual(tokenSchema.token);
    });

    it('should throw InvariantError in not satisfied schema', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const tokenRepository = new TokenKnexRepository(knexConfig);
      // Assert
      await expect(tokenRepository.store({ token: 'token' })).rejects.toThrow(
        InvariantError
      );
    });

    it('should throw DatabaseError if query has error', async () => {
      // Arrange
      const tokenSchema = new GeneratedToken({ token: 'token' });
      const knexConfig = knex(testingEnv);
      const tokenRepository = new TokenKnexRepository(knexConfig);
      // Assert
      await expect(tokenRepository.store(tokenSchema)).rejects.toThrow(
        DatabaseError
      );
    });
  });

  describe('getBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const tokenSchema = new GeneratedToken({ token: 'token2' });
      const knexConfig = knex(testing);
      const tokenRepository = new TokenKnexRepository(knexConfig);
      await tokenRepository.store(tokenSchema);
      // Action
      const result = await tokenRepository.getBy(tokenSchema.token);
      // Assert
      expect(result.length).toEqual(1);
      expect(result[0].token).toEqual(tokenSchema.token);
    });

    it('should throw NotFoundError if not token found', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const tokenRepository = new TokenKnexRepository(knexConfig);
      // Assert
      await expect(tokenRepository.getBy('token')).rejects.toThrow(
        NotFoundError
      );
    });

    it('should throw DatabaseError if query has error', async () => {
      // Arrange
      const knexConfig = knex(testingEnv);
      const tokenRepository = new TokenKnexRepository(knexConfig);
      // Assert
      await expect(tokenRepository.getBy('token')).rejects.toThrow(
        DatabaseError
      );
    });
  });

  describe('destroyBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const tokenSchema = new GeneratedToken({ token: 'token' });
      const knexConfig = knex(testing);
      const tokenRepository = new TokenKnexRepository(knexConfig);
      await tokenRepository.store(tokenSchema);
      // Action
      await tokenRepository.destroyBy(tokenSchema.token);
      // Assert
      const result = await knexConfig(TokenRepository.tableName).where(
        'token',
        tokenSchema.token
      );
      expect(result.length).toEqual(0);
    });

    it('should throw DatabaseError if query has error', async () => {
      // Arrange
      const knexConfig = knex(testingEnv);
      const tokenRepository = new TokenKnexRepository(knexConfig);
      // Assert
      await expect(tokenRepository.destroyBy('token')).rejects.toThrow(
        DatabaseError
      );
    });
  });
});

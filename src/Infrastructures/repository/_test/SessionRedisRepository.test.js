import { getClient } from '../../session/redisClient';
import SessionRedisRepository from '../SessionRedisRepository';

describe('SessionRedisRepository', () => {
  let redisClient = getClient();

  afterEach(async () => {
    await redisClient.connect();
    await redisClient.v4.FLUSHDB();
    await redisClient.disconnect();
  });

  describe('set function', () => {
    it('should working perfectly', async () => {
      // Arrange
      const sessionData = {
        key: 'key',
        value: 'value',
      };
      const sessionRepository = new SessionRedisRepository(redisClient);
      // Action
      await sessionRepository.set(sessionData.key, sessionData.value);

      // Assert
      await redisClient.connect();
      const result = await redisClient.v4.GET(sessionData.key, {});
      await redisClient.disconnect();
      expect(result).toEqual(sessionData.value);
    });
  });

  describe('get function', () => {
    it('should working perfectly', async () => {
      // Arrange
      const sessionData = {
        key: 'key',
        value: 'value',
      };
      await redisClient.connect();
      await redisClient.v4.SET(sessionData.key, sessionData.value);
      await redisClient.disconnect();
      const sessionRepository = new SessionRedisRepository(redisClient);
      // Action
      const result = await sessionRepository.get(sessionData.key);

      // Assert
      expect(result).toEqual(sessionData.value);
    });
  });

  describe('update function', () => {
    it('should working perfectly', async () => {
      // Arrange
      const sessionData = {
        key: 'key',
        value: 'value',
      };
      const newSessionDataValue = 'edited value';
      await redisClient.connect();
      await redisClient.v4.SET(sessionData.key, sessionData.value);
      await redisClient.disconnect();
      const sessionRepository = new SessionRedisRepository(redisClient);

      // Action
      await sessionRepository.update(sessionData.key, newSessionDataValue);

      // Assert
      await redisClient.connect();
      const result = await redisClient.v4.GET(sessionData.key, {});
      await redisClient.disconnect();
      expect(result).toEqual(newSessionDataValue);
    });
  });

  describe('del function', () => {
    it('should working perfectly', async () => {
      // Arrange
      const sessionData = {
        key: 'key',
        value: 'value',
      };
      await redisClient.connect();
      await redisClient.v4.SET(sessionData.key, sessionData.value);
      await redisClient.disconnect();
      const sessionRepository = new SessionRedisRepository(redisClient);
      
      // Action
      await sessionRepository.del(sessionData.key);

      // Assert
      await redisClient.connect();
      const result = await redisClient.v4.GET(sessionData.key, {});
      await redisClient.disconnect();
      expect(result).toBeNull()
    });
  });
});

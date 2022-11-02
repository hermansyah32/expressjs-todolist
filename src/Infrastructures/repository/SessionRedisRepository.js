import SessionError from '../../Commons/exceptions/SessionError';
import SessionRepository from '../../Domains/session/SessionRepository';

export default class SessionRedisRepository extends SessionRepository {
  constructor(redis) {
    super();
    this._redis = redis;
  }

  async client() {
    return this._redis;
  }

  async set(key, value, options = {}) {
    await this._redis.connect();
    try {
      await this._redis.v4.SET(key, value, options);
    } catch (error) {
      throw new SessionError(error.message, error);
    } finally {
      await this._redis.disconnect();
    }
  }

  async get(key, options = {}) {
    await this._redis.connect();
    let result = null;
    try {
      result = await this._redis.v4.GET(key, options);
    } catch (error) {
      throw new SessionError(error.message, error);
    } finally {
      await this._redis.disconnect();
      return result;
    }
  }

  async update(key, value, options = {}) {
    try {
      await this.del(key);
      await this.set(key, value, options);
    } catch (error) {
      throw new SessionError(error.message, error);
    }
  }

  async del(key) {
    await this._redis.connect();
    try {
      await this._redis.v4.DEL(key);
    } catch (error) {
      throw new SessionError(error.message, error);
    } finally {
      await this._redis.disconnect();
    }
  }
}

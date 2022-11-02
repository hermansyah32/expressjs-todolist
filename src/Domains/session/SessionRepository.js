export default class SessionRepository {
  async set(key, value, options = {}) {
    throw new Error('SESSION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async get(key, options = {}) {
    throw new Error('SESSION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async update(key, value, options = {}) {
    throw new Error('SESSION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async del(key, options = {}) {
    throw new Error('SESSION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

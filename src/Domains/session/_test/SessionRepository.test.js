import SessionRepository from '../SessionRepository';

describe('SessionRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const sessionRepository = new SessionRepository();

    await expect(sessionRepository.set('key', 'value', {})).rejects.toThrowError(
      'SESSION_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );

    await expect(sessionRepository.get('key', {})).rejects.toThrowError(
      'SESSION_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );

    await expect(sessionRepository.update('key', 'value', {})).rejects.toThrowError(
      'SESSION_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );

    await expect(sessionRepository.del('key', {})).rejects.toThrowError(
      'SESSION_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );

    await expect(sessionRepository.client()).rejects.toThrowError(
      'SESSION_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});

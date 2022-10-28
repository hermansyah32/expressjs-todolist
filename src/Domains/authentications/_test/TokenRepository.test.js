import TokenRepository from '../TokenRepository';

describe('TokenRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const tokenRepository = new TokenRepository();

    await expect(tokenRepository.store({})).rejects.toThrowError(
      'TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(tokenRepository.getBy('token')).rejects.toThrowError(
      'TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(tokenRepository.destroyBy('token')).rejects.toThrowError(
      'TOKEN_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});

import TokenManager from '../TokenManager';

describe('TokenManage', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const tokenManager = new TokenManager();

    await expect(tokenManager.createAccessToken('')).rejects.toThrowError(
      'TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
    );
    await expect(tokenManager.createRefreshToken('')).rejects.toThrowError(
      'TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
    );
    await expect(tokenManager.decodePayload('')).rejects.toThrowError(
      'TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
    );
    await expect(tokenManager.verifyRefreshToken('')).rejects.toThrowError(
      'TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED'
    );
  });
});

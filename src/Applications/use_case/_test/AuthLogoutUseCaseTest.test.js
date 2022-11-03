import TokenRepository from '../../../Domains/authentications/TokenRepository';
import AuthLogoutUseCase from '../AuthLogoutUseCase';
import SessionRepository from '../../../Domains/session/SessionRepository';

describe('AuthLogoutUseCase', () => {
  it('should orchestrating the delete authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      dataPayload: {
        iat: 123,
        exp: 321,
        username: 'username',
      },
    };
    const mockTokenRepository = new TokenRepository();
    const mockSessionRepository = new SessionRepository();

    // Mocking
    mockTokenRepository.destroyBy = jest.fn().mockImplementation(() => Promise.resolve());
    mockSessionRepository.set = jest.fn().mockImplementation(() => Promise.resolve());

    // create use case instance
    const authLogoutUseCase = new AuthLogoutUseCase({
      tokenRepository: mockTokenRepository,
      sessionRepository: mockSessionRepository
    });

    // Action
    await authLogoutUseCase.execute(useCasePayload);

    // Assert
    expect(mockTokenRepository.destroyBy).toBeCalledTimes(1);
    expect(mockSessionRepository.set).toBeCalledTimes(1);
  });
});

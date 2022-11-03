import TokenManager from '../../security/TokenManager';
import SessionRepository from '../../../Domains/session/SessionRepository';
import AuthRefreshAccessUseCase from '../AuthRefreshAccessUseCase';
import AuthAccessToken from '../../../Domains/authentications/schemas/AuthAccessToken';

describe('AuthRefreshAccessUseCaseTest', () => {
  it('should orchestrating the refresh authentication action correctly', async () => {
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
    const expectedAuthentication = new AuthAccessToken({
      accessToken: 'access_token',
    });
    const mockTokenManger = new TokenManager();
    const mockSessionRepository = new SessionRepository();

    // Mocking
    mockTokenManger.createAccessToken = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(expectedAuthentication.accessToken)
      );
    mockSessionRepository.set = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    // create use case instance
    const authRefreshAccessUseCase = new AuthRefreshAccessUseCase({
      tokenManager: mockTokenManger,
      sessionRepository: mockSessionRepository,
    });

    // Action
    const actualAuthentication = await authRefreshAccessUseCase.execute(
      useCasePayload
    );

    // Assert
    expect(actualAuthentication).toEqual(expectedAuthentication);
    expect(mockTokenManger.createAccessToken).toBeCalledWith({
      username: useCasePayload.dataPayload.username,
    });
    expect(mockSessionRepository.set).toBeCalledTimes(1);
  });
});

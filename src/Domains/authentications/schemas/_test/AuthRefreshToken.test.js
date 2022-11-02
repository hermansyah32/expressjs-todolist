import AuthRefreshToken from '../AuthRefreshToken';

describe('AuthRefreshToken', () => {
  it('should throw error when payload not contain needed property', () => {
    expect(() => new AuthRefreshToken({})).toThrowError(
      'SCHEMA_GENERATED_TOKEN.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      refreshToken: 'refreshToken',
    };
    const authToken = new AuthRefreshToken(payload);

    expect(authToken.refreshToken).toEqual(payload.refreshToken);
  });
});

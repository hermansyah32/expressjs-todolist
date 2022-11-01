import AuthToken from '../AuthToken';

describe('AuthToken', () => {
  it('should throw error when payload not contain needed property', () => {
    expect(() => new AuthToken({})).toThrowError(
      'SCHEMA_GENERATED_TOKEN.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    const authToken = new AuthToken(payload);

    expect(authToken.accessToken).toEqual(payload.accessToken);
    expect(authToken.refreshToken).toEqual(payload.refreshToken);
  });
});

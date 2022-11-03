import AuthAccessToken from '../AuthAccessToken';

describe('AuthAccessToken', () => {
  it('should throw error when payload not contain needed property', () => {
    expect(() => new AuthAccessToken({})).toThrowError(
      'SCHEMA_GENERATED_TOKEN.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      accessToken: 'access_token',
    };
    const authToken = new AuthAccessToken(payload);

    expect(authToken.accessToken).toEqual(payload.accessToken);
  });
});

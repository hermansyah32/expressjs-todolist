import DataToken from '../DataToken';

describe('DataToken', () => {
  it('should throw error when payload not contain needed property', () => {
    expect(() => new DataToken({})).toThrowError(
      'SCHEMA_GENERATED_TOKEN.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      dataPayload: {
        iat: 123,
        exp: 123,
        username: 'username',
      },
    };
    const dataToken = new DataToken(payload);

    expect(dataToken.accessToken).toEqual(payload.accessToken);
    expect(dataToken.refreshToken).toEqual(payload.refreshToken);
  });

  it('should create object correctly without refreshToken', () => {
    const payload = {
      accessToken: 'access_token',
      dataPayload: {
        iat: 123,
        exp: 123,
        username: 'username',
      },
    };
    const dataToken = new DataToken(payload);

    expect(dataToken.accessToken).toEqual(payload.accessToken);
    expect(dataToken.refreshToken).toEqual(null);
  });
});

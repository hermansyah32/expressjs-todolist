import UserLogin from '../UserLogin';

describe('UserLogin schemas', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      username: 'hermansyah32',
    };

    expect(() => new UserLogin(payload)).toThrowError(
      'SCHEMA_USER_LOGIN.VALIDATION_ERROR'
    );
  });

  it('should create object correctly with username', () => {
    const payload = {
      username: 'hermansyah32',
      password: 'username',
    };
    const userLogin = new UserLogin(payload);

    expect(userLogin.username).toEqual(payload.username);
    expect(userLogin.password).toEqual(payload.password);
  });

  it('should create object correctly with email', () => {
    const payload = {
      username: 'me@hermansyah.dev',
      password: 'username',
    };
    const userLogin = new UserLogin(payload);

    expect(userLogin.username).toEqual(payload.username);
    expect(userLogin.email).toEqual(payload.email);
    expect(userLogin.password).toEqual(payload.password);
  });
});

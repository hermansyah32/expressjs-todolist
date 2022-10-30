import RegisterUser from '../RegisterUser';

describe('RegisterUser schemas', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      username: 'hermansyah32',
      fullname: 'Hermansyah',
    };

    expect(() => new RegisterUser(payload)).toThrowError(
      'SCHEMA_REGISTER_USER.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      username: 'hermansyah32',
      email: 'me@hermansyah.dev',
      fullname: 'Hermansyah',
      password: 'password',
    };
    const registerUser = new RegisterUser(payload);

    expect(registerUser.username).toEqual(payload.username);
    expect(registerUser.email).toEqual(payload.email);
    expect(registerUser.fullname).toEqual(payload.fullname);
    expect(registerUser.password).toEqual(payload.password);
  });
});

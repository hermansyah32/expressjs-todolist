import RegisteredUser from '../RegisteredUser';

describe('RegisteredUser schemas', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      username: 'hermansyah32',
      fullname: 'Hermansyah',
    };

    expect(() => new RegisteredUser(payload)).toThrowError(
      'SCHEMA_REGISTERED_USER.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      id: 'uuid',
      username: 'hermansyah32',
      email: 'me@hermansyah.dev',
      fullname: 'Hermansyah',
    };
    const registeredUser = new RegisteredUser(payload);

    expect(registeredUser.id).toEqual(payload.id);
    expect(registeredUser.username).toEqual(payload.username);
    expect(registeredUser.email).toEqual(payload.email);
    expect(registeredUser.fullname).toEqual(payload.fullname);
  });
});

import PasswordUser from '../PasswordUser';

describe('PasswordUser schemas', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      password: 'password',
    };

    expect(() => new PasswordUser(payload)).toThrowError(
      'SCHEMA_PASSWORD_USER.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      id: 'id',
      password: 'password',
    };
    const passwordUser = new PasswordUser(payload);

    expect(passwordUser.id).toEqual(payload.id);
    expect(passwordUser.password).toEqual(payload.password);
  });
});

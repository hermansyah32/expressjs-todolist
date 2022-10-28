import PasswordHash from '../PasswordHash';

describe('PasswordHash', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const passwordHash = new PasswordHash();

    await expect(passwordHash.hash('dummy_password')).rejects.toThrowError(
      'PASSWORD_HASH.METHOD_NOT_IMPLEMENTED'
    );
    await expect(
      passwordHash.compare('plain', 'encrypted')
    ).rejects.toThrowError('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  });
});
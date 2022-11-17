import AuthenticationError from '../../../Commons/exceptions/AuthenticationError';
import bcrypt from 'bcrypt';
import BcryptPasswordHash from '../BcryptPasswordHash';

describe('BcryptPasswordHash', () => {
  describe('encryptPassword function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      // Action
      const encryptedPassword = await bcryptPasswordHash.hash('plain_password');

      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10);
    });
  });

  describe('comparePassword function', () => {
    it('should throw AuthenticationError if password not match', async () => {
      // Arrange
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      // Action 
      const result = await bcryptPasswordHash.compare('plain_password', 'encrypted_password');
      // Assert
      expect(result).toEqual(false);
    });

    it('should not return AuthenticationError if password match', async () => {
      // Arrange
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
      const plainPassword = 'secret';
      const encryptedPassword = await bcryptPasswordHash.hash(plainPassword);

      // Action
      const result = await bcryptPasswordHash.compare(plainPassword, encryptedPassword);

      // Assert
      await expect(result).toEqual(true)
    });
  });
});

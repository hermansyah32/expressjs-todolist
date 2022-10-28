import InvariantError from '../../../Commons/exceptions/InvariantError';
import jwt from 'jsonwebtoken';
import JwtTokenManager from '../JwtTokenManager';
import {
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_EXPIRE,
} from '../../../Commons/Constants/common';

describe('JwtTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create accessToken correctly', async () => {
      // Arrange
      const payload = {
        username: 'hermansyah32',
      };
      const signOptions = { expiresIn: ACCESS_TOKEN_EXPIRE };
      const mockJwtToken = {
        sign: jest.fn().mockImplementation(() => 'mock_token'),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      // Action
      const accessToken = await jwtTokenManager.createAccessToken(payload);

      // Assert
      expect(mockJwtToken.sign).toBeCalledWith(
        payload,
        process.env.ACCESS_TOKEN_KEY,
        signOptions
      );
      expect(accessToken).toEqual('mock_token');
    });
  });

  describe('createRefreshToken function', () => {
    it('should create refreshToken correctly', async () => {
      // Arrange
      const payload = {
        username: 'hermansyah32',
      };
      const signOptions = { expiresIn: REFRESH_TOKEN_EXPIRE };
      const mockJwtToken = {
        sign: jest.fn().mockImplementation(() => 'mock_token'),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      // Action
      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      // Assert
      expect(mockJwtToken.sign).toBeCalledWith(
        payload,
        process.env.REFRESH_TOKEN_KEY,
        signOptions
      );
      expect(refreshToken).toEqual('mock_token');
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should throw InvariantError when verification failed', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(jwt);
      const accessToken = await jwtTokenManager.createAccessToken({
        username: 'hermansyah32',
      });

      // Action & Assert
      await expect(
        jwtTokenManager.verifyRefreshToken(accessToken)
      ).rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError when refresh token verified', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(jwt);
      const refreshToken = await jwtTokenManager.createRefreshToken({
        username: 'hermansyah32',
      });

      // Action & Assert
      await expect(
        jwtTokenManager.verifyRefreshToken(refreshToken)
      ).resolves.not.toThrow(InvariantError);
    });
  });

  describe.skip('decodePayload function', () => {
    it('should decode payload correctly', async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(jwt);
      const accessToken = await jwtTokenManager.createAccessToken({
        username: 'hermansyah32',
      });

      // Action
      const { username: expectedUsername } =
        await jwtTokenManager.decodePayload(accessToken);

      // Action & Assert
      expect(expectedUsername).toEqual('hermansyah32');
    });
  });
});

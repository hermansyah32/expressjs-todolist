import TokenManager from '../../Applications/security/TokenManager';
import {
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_EXPIRE,
} from '../../Commons/Constants/common';
import InvariantError from '../../Commons/exceptions/InvariantError';

export default class JwtTokenManager extends TokenManager {
  /**
   *
   * @param {import('jsonwebtoken')} jwt
   */
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  async createAccessToken(payload) {
    return this._jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRE
    });
  }

  async createRefreshToken(payload) {
    return this._jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRE,
      mutatePayload: true // set feedback to payload
    });
  }

  async verifyAccessToken(token) {
    try {
      return this._jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError('token is invalid');
    }
  }

  async verifyRefreshToken(token) {
    try {
      return this._jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    } catch (error) {
      throw new InvariantError('refresh token is invalid');
    }
  }

  async decodePayload(token) {
    const payload = this._jwt.decode(token);
    return payload;
  }
}

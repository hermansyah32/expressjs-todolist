import dayjs from 'dayjs';
import PasswordHash from '../../security/PasswordHash';
import UserLogin from '../../../Domains/users/schemas/UserLogin';
import UserRepository from '../../../Domains/users/UserRepository';
import TokenManager from '../../security/TokenManager';
import TokenRepository from '../../../Domains/authentications/TokenRepository';
import AuthenticationError from '../../../Commons/exceptions/AuthenticationError';
import AuthToken from '../../../Domains/authentications/schemas/AuthToken';
import GeneratedToken from '../../../Domains/authentications/schemas/GeneratedToken';
import { REFRESH_TOKEN_EXPIRE } from '../../../Commons/Constants/common';
import RegisteredUser from '../../../Domains/users/schemas/RegisteredUser';

export default class AuthLoginUseCase {
  /**
   *
   * @param {TokenManager} tokenManager
   * @param {TokenRepository} tokenRepository
   * @param {UserRepository} userRepository
   * @param {PasswordHash} passwordHash
   */
  constructor({tokenManager, tokenRepository, userRepository, passwordHash}) {
    this._tokenManager = tokenManager;
    this._tokenRepository = tokenRepository;
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
  }

  async execute(payload) {
    const userLogin = new UserLogin(payload);
    const userPassword = await this._userRepository.getWithPassword(userLogin.username, userLogin.email);
    const isAuthenticated = await this._passwordHash.compare(userLogin.password, userPassword.password);
    if (!isAuthenticated) throw new AuthenticationError("Credential doesn't match");

    const tokenPayload = { username: userLogin.username }; // refreshToken will be mutated ang get expired seconds
    const accessToken = await this._tokenManager.createAccessToken(tokenPayload);
    const refreshToken = await this._tokenManager.createRefreshToken(tokenPayload);

    const expiredAt = tokenPayload.exp 
      ? dayjs(tokenPayload.exp * 1000).format('YYYY-MM-DD HH:mm:ss') 
      : dayjs().add(REFRESH_TOKEN_EXPIRE,'second').format('YYYY-MM-DD HH:mm:ss');
    const authToken = new AuthToken({accessToken: accessToken, refreshToken: refreshToken});
    const generatedToken = new GeneratedToken({
      token: refreshToken, 
      expired_at: expiredAt
    });
    await this._tokenRepository.store(generatedToken);
    return {
      token: authToken,
      data: new RegisteredUser({...userPassword})
    };
  }
}

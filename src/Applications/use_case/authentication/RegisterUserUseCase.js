import dayjs from 'dayjs';
import UserRepository from '../../../Domains/users/UserRepository';
import TokenManager from '../../security/TokenManager';
import TokenRepository from '../../../Domains/authentications/TokenRepository';
import AuthToken from '../../../Domains/authentications/schemas/AuthToken';
import GeneratedToken from '../../../Domains/authentications/schemas/GeneratedToken';
import { REFRESH_TOKEN_EXPIRE } from '../../../Commons/Constants/common';
import RegisterUser from '../../../Domains/users/schemas/RegisterUser';
import RegisteredUser from '../../../Domains/users/schemas/RegisteredUser';

export default class RegisterUserUseCase {
  /**
   *
   * @param {TokenManager} tokenManager
   * @param {TokenRepository} tokenRepository
   * @param {UserRepository} userRepository
   */
  constructor({ tokenManager, tokenRepository, userRepository, passwordHash }) {
    this._tokenManager = tokenManager;
    this._tokenRepository = tokenRepository;
    this._userRepository = userRepository;
  }

  async execute(payload){
    const userPayload = new RegisterUser(payload);
    /**@type {RegisteredUser} */
    const registeredUser = await this._userRepository.store(userPayload);

    const tokenPayload = { username: registeredUser.username }; // refreshToken will be mutated ang get expired seconds
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
        user: registeredUser,
        token: authToken
    };
  }
}

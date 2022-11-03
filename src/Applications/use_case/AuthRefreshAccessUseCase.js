import DataToken from '../../Domains/authentications/schemas/DataToken';
import SessionRepository from '../../Domains/session/SessionRepository';
import AuthAccessToken from '../../Domains/authentications/schemas/AuthAccessToken';
import TokenManager from '../security/TokenManager';
import dayjs from 'dayjs';

export default class AuthRefreshAccessUseCase {
  /**
   *
   * @param {TokenManager} tokenManager
   * @param {SessionRepository} sessionRepository
   */
  constructor({tokenManager, sessionRepository}) {
    this._tokenManager = tokenManager;
    this._sessionRepository = sessionRepository;
  }

  async execute(payload) {
    const dataToken = new DataToken(payload);
    const tokenPayload = { username: dataToken.dataPayload.username };
    const accessToken = await this._tokenManager.createAccessToken(tokenPayload);
    const authToken = new AuthAccessToken({accessToken: accessToken});

    const oldTokenExpiredTime = dayjs(dataToken.dataPayload.exp * 1000);
    const oldTokenDiff = dayjs().diff(oldTokenExpiredTime, 'second')
    if (oldTokenDiff > 0) await this._sessionRepository.set(`logout:${dataToken.slicedAccessToken()}`, 1, {EX: oldTokenDiff});
    return authToken;
  }
}

import dayjs from 'dayjs';
import DataToken from '../../Domains/authentications/schemas/DataToken';
import TokenRepository from '../../Domains/authentications/TokenRepository';
import SessionRepository from '../../Domains/session/SessionRepository';

export default class AuthLogoutUseCase {
  /**
   *
   * @param {TokenRepository} tokenRepository
   * @param {SessionRepository} sessionRepository
   */
  constructor({ tokenRepository, sessionRepository }) {
    this._tokenRepository = tokenRepository;
    this._sessionRepository = sessionRepository;
  }

  async execute(payload) {
    const dataToken = new DataToken(payload);
    // remove session. access token and refresh token

    await this._tokenRepository.destroyBy(dataToken.refreshToken);
    await this._sessionRepository.set(
      `logout:${dataToken.slicedAccessToken()}`,
      1,
      { EX: dayjs(dataToken.dataPayload.exp).diff(dayjs(), 'second') }
    );
  }
}

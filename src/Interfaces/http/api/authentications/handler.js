import AuthLoginUseCase from "../../../../Applications/use_case/authentication/AuthLoginUseCase";
import AuthLogoutUseCase from "../../../../Applications/use_case/authentication/AuthLogoutUseCase";
import AuthRefreshAccessUseCase from "../../../../Applications/use_case/authentication/AuthRefreshAccessUseCase";
import RegisterUserUseCase from "../../../../Applications/use_case/authentication/RegisterUserUseCase";
import { BodyResponse } from "../../../../Commons/Response/BodyResponse";

export default class AuthenticationHandler {
  constructor(container) {
    this._container = container;
    this.postLogin = this.postLogin.bind(this);
    this.postLogout = this.postLogout.bind(this);
    this.postRefreshToken = this.postRefreshToken.bind(this);
    this.postRegister = this.postRegister.bind(this);
  }

  async postLogin(req, res, next) {
    try {
      /**@type {AuthLoginUseCase} */
      const authLoginUseCase = this._container.getInstance(AuthLoginUseCase.name);
      const result = await authLoginUseCase.execute(req.body);
      const bodyResponse = new BodyResponse().setData(result.data).setToken(result.token).build();
      res.send(bodyResponse);
    } catch (error) {
      next(error);
    }
  }

  async postLogout(req, res, next) {
    try {
      /**@type {AuthLogoutUseCase} */
      const authLogoutUseCase = this._container.getInstance(AuthLogoutUseCase.name);
      await authLogoutUseCase.execute({accessToken: req.accessToken, refreshToken: req.refreshToken, dataPayload: req.dataPayload});
      const bodyResponse = new BodyResponse().setMessage('successfully logout').build();
      res.send(bodyResponse);
    } catch (error) {
      next(error);
    }
  }

  async postRefreshToken(req, res, next) {
    try {
      /**@type {AuthRefreshAccessUseCase} */
      const authRefreshAccessUseCase = this._container.getInstance(AuthRefreshAccessUseCase.name);
      const result = await authRefreshAccessUseCase.execute({accessToken: req.accessToken, refreshToken: req.refreshToken, dataPayload: req.dataPayload});
      const bodyResponse = new BodyResponse().setData(result).build();
      res.send(bodyResponse);
    } catch (error) {
      next(error)
    }
  }
  async postRegister(req, res, next) {
    try {
      /**@type {RegisterUserUseCase} */
      const registerUserUseCase = this._container.getInstance(RegisterUserUseCase.name);
      const result = await registerUserUseCase.execute(req.body);
      const bodyResponse = new BodyResponse().setData(result).build();
      res.send(bodyResponse);
    } catch (error) {
      next(error)
    }
  }
}

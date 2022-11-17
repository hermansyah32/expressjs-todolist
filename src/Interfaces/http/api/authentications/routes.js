import { Router } from 'express';
import authentication from '../../../../Infrastructures/http/authentication';
import authenticationRefresh from '../../../../Infrastructures/http/authenticationRefresh';
import AuthenticationHandler from './handler';

/**
 * @param {Router} router Express router
 */
export function serve(container) {
  const handler = new AuthenticationHandler(container);
  const router = Router();

  router.post('/auth/login', handler.postLogin);
  router.post('/auth/logout', authentication(container), handler.postLogout);
  router.post('/auth/refresh', authenticationRefresh(container), handler.postRefreshToken);
  router.post('/auth/register', handler.postRegister);
  return router;
}

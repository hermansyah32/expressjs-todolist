import { Router } from 'express';
import authentication from '../../../../Infrastructures/http/authentication';
import authenticationRefresh from '../../../../Infrastructures/http/authenticationRefresh';
import TodoHandler from './handler';

/**
 * @param {Router} router Express router
 */
export function serve(container) {
  const handler = new TodoHandler(container);
  const router = Router();

  router.get('/todos', authentication(container),handler.index);
  router.get('/trashed/todos', authentication(container),handler.indexTrashed);
  router.get('/todos/:id', authentication(container),handler.show);
  router.get('/trashed/todos/:id', authentication(container),handler.showTrashed);
  router.post('/todos', authentication(container),handler.store);
  router.put('/todos/:id', authentication(container), handler.update)
  router.put('/trashed/todos/:id', authentication(container), handler.restore)
  router.delete('/todos/:id', authentication(container), handler.destroy)
  router.delete('/trashed/todos/:id', authentication(container), handler.forceDestroy)
  
  return router;
}

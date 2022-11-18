import express from 'express';
import bodyParser from 'body-parser';
import cors from './cors';
import * as errorHandler from './errorHandler';
import helmet from 'helmet';
import logger from '../logger/winstonLog';
import morgan from 'morgan';
import * as AuthenticationServe from '../../Interfaces/http/api/authentications/routes';
import * as TodoServe from '../../Interfaces/http/api/todos/routes';
import * as Constants from '../../Commons/Constants/common';

export default async function createServer(container) {
  /**
   * Express instance
   */
  const app = express();

  // request logging. 'dev' | 'test' : console / 'prod' : file
  app.use(morgan('combined', { stream: logger.stream }));

  // This middleware take care of the origin when the origin is undefined.
  // origin is undefined when request is local
  app.use((req, _, next) => {
    req.headers.origin = req.headers.origin || req.headers.host;
    next();
  });

  // CORS configuration
  app.use(cors());

  // parse body params and attache them to req.body
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  // secure apps by setting various HTTP headers
  app.use(helmet());

  /**
   * App configuration
   */

  // session configuration
  // app.use(session());

  // mount routes
  app.use('/api', AuthenticationServe.serve(container));
  app.use('/api', TodoServe.serve(container));

  // error handler
  app.use(errorHandler.response);

  // start application
  app.listen(Constants.APP_PORT, (err) => {
	if (err) {
	  console.log('Server started :>> ', err);
	}
	console.log(`Server started [env,port] => [${process.env.NODE_ENV + ',' + Constants.APP_PORT}]`);
  });

  return app;
}

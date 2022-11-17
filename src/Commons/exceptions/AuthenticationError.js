import ClientError from './ClientError';

export default class AuthenticationError extends ClientError {
  constructor(message = 'authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

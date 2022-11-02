import ServerError from './ServerError';

export default class SessionError extends ServerError {
  constructor(message, state) {
    super(message);
    this.name = 'SessionError';
    if (!state) this.state = state;
  }
}

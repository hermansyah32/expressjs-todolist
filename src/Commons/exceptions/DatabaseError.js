import ServerError from './ServerError';

export default class DatabaseError extends ServerError {
  constructor(message, state) {
    super(message);
    this.name = 'DatabaseError';
    if (!state) this.state = state;
  }
}

export default class ServerError extends Error {
  constructor(message, statusCode = 500) {
    super(message);

    if (this.constructor.name === 'ServerError') {
      throw new Error('cannot instantiate abstract class');
    }

    this.name = 'ServerError';
    this.statusCode = statusCode;
    this.message = message;
  }
}

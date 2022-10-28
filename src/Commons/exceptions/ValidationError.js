import ClientError from './ClientError';

export default class ValidationError extends ClientError {
  constructor(message, errors) {
    super(message, 422);
    this.name = 'ValidationError';
    if (errors) this.stack = this._translateStack(errors);
  }

  _translateStack(stack) {
    if (stack.length < 1) return stack;
    return JSON.stringify(
      stack.map((err) => ({
        property: err.instancePath,
        message: err.message,
      }))
    );
  }
}

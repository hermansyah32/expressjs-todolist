import ClientError from './ClientError';

export default class ValidationError extends ClientError {
  constructor(message, errors) {
    super(message, 422);
    this.name = 'ValidationError';
    if (errors) this.data = this._translateStack(errors);
  }

  _translateStack(data) {
    if (data.length < 1) return data;
    return JSON.stringify(
      data.map((err) => ({
        property: err.instancePath,
        message: err.message,
      }))
    );
  }
}

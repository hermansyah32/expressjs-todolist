import ValidationError from '../ValidationError';

describe('ValidationError', () => {
  it('should create error correctly', () => {
    const validationError = new ValidationError('validation!', [
      { required: 'login is required' },
    ]);

    expect(validationError.message).toEqual('validation!');
    expect(validationError.statusCode).toEqual(422);
    expect(validationError.name).toEqual('ValidationError');
  });
});

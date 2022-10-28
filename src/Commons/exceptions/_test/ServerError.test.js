import ServerError from '../ServerError';

describe('ServerError', () => {
  it('should throw error when directly use it', () => {
    expect(() => new ServerError('')).toThrowError(
      'cannot instantiate abstract class'
    );
  });
});

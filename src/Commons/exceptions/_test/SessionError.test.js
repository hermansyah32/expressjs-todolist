import SessionError from '../SessionError';

describe('SessionError', () => {
  it('should create an error correctly', () => {
    const sessionError = new SessionError('an error occurs');

    expect(sessionError.statusCode).toEqual(500);
    expect(sessionError.name).toEqual('SessionError');
  });
});

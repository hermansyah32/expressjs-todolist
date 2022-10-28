import DatabaseError from '../DatabaseError';

describe('DatabaseError', () => {
  it('should create an error correctly', () => {
    const databaseError = new DatabaseError('an error occurs');

    expect(databaseError.statusCode).toEqual(500);
    expect(databaseError.name).toEqual('DatabaseError');
  });
});

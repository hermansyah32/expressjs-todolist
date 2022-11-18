import ShowTodo from '../ShowTodo';

describe('ShowTodo schemas', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {};

    expect(() => new ShowTodo(payload)).toThrowError(
      'SCHEMA_SHOW_TODO.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      id: 'uuid',
    };
    const showTodo = new ShowTodo(payload);

    expect(showTodo.id).toEqual(payload.id);
  });
});

import CreateTodo from '../CreateTodo';

describe('CreateTodo schemas', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      description: 'Key point of Javascript',
    };

    expect(() => new CreateTodo(payload)).toThrowError(
      'SCHEMA_CREATE_TODO.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      todo: 'Take a note',
      description: 'Key point of Javascript',
    };
    const createTodo = new CreateTodo(payload);

    expect(createTodo.id).toBeTruthy();
    expect(createTodo.todo).toEqual(payload.todo);
    expect(createTodo.description).toEqual(payload.description);
  });
});

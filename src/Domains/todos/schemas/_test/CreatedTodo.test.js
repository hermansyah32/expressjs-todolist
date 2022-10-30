import CreatedTodo from '../CreatedTodo';

describe('CreatedTodo schemas', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      todo: 'Take a note',
      description: 'Key point of Javascript',
    };

    expect(() => new CreatedTodo(payload)).toThrowError(
      'SCHEMA_CREATED_TODO.VALIDATION_ERROR'
    );
  });

  it('should create object correctly', () => {
    const payload = {
      id: 'uuid',
      todo: 'Take a note',
      description: 'Key point of Javascript',
    };
    const createdTodo = new CreatedTodo(payload);

    expect(createdTodo.id).toEqual(payload.id);
    expect(createdTodo.todo).toEqual(payload.todo);
    expect(createdTodo.description).toEqual(payload.description);
  });
});

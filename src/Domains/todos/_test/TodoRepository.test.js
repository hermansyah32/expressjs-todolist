import TodoRepository from '../TodoRepository';

describe('TodoRepository Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const todoRepository = new TodoRepository();

    await expect(todoRepository.index({})).rejects.toThrowError(
      'TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(todoRepository.indexTrashed({})).rejects.toThrowError(
      'TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(todoRepository.store({})).rejects.toThrowError(
      'TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(todoRepository.getBy('col', 'val')).rejects.toThrowError(
      'TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(
      todoRepository.getTrashedBy('col', 'val')
    ).rejects.toThrowError('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(
      todoRepository.updateBy('col', 'val', {})
    ).rejects.toThrowError('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(todoRepository.restoreBy('col', 'val')).rejects.toThrowError(
      'TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(todoRepository.destroyBy('col', 'val')).rejects.toThrowError(
      'TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );

    await expect(
      todoRepository.permanentDestroyBy('col', 'val')
    ).rejects.toThrowError('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});

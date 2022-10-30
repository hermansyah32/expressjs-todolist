import UserRepository from '../UserRepository';

describe('UserRepository Interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const userRepository = new UserRepository();

    await expect(userRepository.index({})).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.indexTrashed({})).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.store({})).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.getBy('col', 'val')).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(
      userRepository.getTrashedBy('col', 'val')
    ).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(
      userRepository.updateBy('col', 'val', {})
    ).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepository.restoreBy('col', 'val')).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.destroyBy('col', 'val')).rejects.toThrowError(
      'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED'
    );

    await expect(
      userRepository.permanentDestroyBy('col', 'val')
    ).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});

import UserManUserCase from "../UserManUseCase";
import UserRepository from "../../../../Domains/users/UserRepository";
import IndexSchema from "../../../../Domains/IndexSchema";
import RegisterUser from "../../../../Domains/users/schemas/RegisterUser";
import RegisteredUser from "../../../../Domains/users/schemas/RegisteredUser";

describe('UserManUseCase', () => {
  describe('index function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        page: 1,
        count: 15,
        search: []
      };
      const expectedResult = {
        data: [1,2,3],
        pagination: {
          total: 3,
          lastPage: 1,
          perPage: payload.count,
          currentPage: payload.page,
          from: 0,
          to: 2
        }
      }
      const mockUserRepository = new UserRepository();
      mockUserRepository.index = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const userManUseCase = new UserManUserCase(mockUserRepository);

      // Action
      const result = await userManUseCase.index(payload);

      // Assert
      expect(mockUserRepository.index).toBeCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('indexTrashed function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        page: 1,
        count: 15,
        search: []
      };
      const expectedResult = {
        data: [1,2,3],
        pagination: {
          total: 3,
          lastPage: 1,
          perPage: payload.count,
          currentPage: payload.page,
          from: 0,
          to: 2
        }
      }
      const mockUserRepository = new UserRepository();
      mockUserRepository.indexTrashed = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const userManUseCase = new UserManUserCase(mockUserRepository);

      // Action
      const result = await userManUseCase.indexTrashed(payload);

      // Assert
      expect(mockUserRepository.indexTrashed).toBeCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('store function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        username: 'hermansyah32',
        email: 'me@hermansyah.dev',
        fullname: 'Hermansyah',
        password: 'password'
      };
      const registerUser = new RegisterUser(payload);
      const expectedResult = new RegisteredUser(registerUser);
      
      const mockUserRepository = new UserRepository();
      mockUserRepository.store = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const userManUseCase = new UserManUserCase(mockUserRepository);

      // Action
      const result = await userManUseCase.store(payload);

      // Assert
      expect(mockUserRepository.store).toBeCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('show function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        id: 'user_id',
        username: 'hermansyah32',
        email: 'me@hermansyah.dev',
        fullname: 'Hermansyah',
      };
      const expectedResult = new RegisteredUser(payload);
      
      const mockUserRepository = new UserRepository();
      mockUserRepository.getBy = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const userManUseCase = new UserManUserCase(mockUserRepository);

      // Action
      const result = await userManUseCase.show(payload.id);

      // Assert
      expect(mockUserRepository.getBy).toBeCalledWith('id', payload.id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('showTrashed function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        id: 'user_id',
        username: 'hermansyah32',
        email: 'me@hermansyah.dev',
        fullname: 'Hermansyah',
      };
      const expectedResult = new RegisteredUser(payload);
      
      const mockUserRepository = new UserRepository();
      mockUserRepository.getTrashedBy = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const userManUseCase = new UserManUserCase(mockUserRepository);

      // Action
      const result = await userManUseCase.showTrashed(payload.id);

      // Assert
      expect(mockUserRepository.getTrashedBy).toBeCalledWith('id', payload.id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        id: 'user_id',
        username: 'hermansyah32',
        email: 'me@hermansyah.dev',
        fullname: 'Hermansyah',
      };
      const expectedResult = new RegisteredUser(payload);
      
      const mockUserRepository = new UserRepository();
      mockUserRepository.updateBy = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const userManUseCase = new UserManUserCase(mockUserRepository);

      // Action
      const result = await userManUseCase.update(payload.id, {username: 'hermansyahp8'});

      // Assert
      expect(mockUserRepository.updateBy).toBeCalledWith('id', payload.id, {username: 'hermansyahp8'});
      expect(result).toEqual(expectedResult);
    });
  });

  describe('restore function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        id: 'user_id',
        username: 'hermansyah32',
        email: 'me@hermansyah.dev',
        fullname: 'Hermansyah',
      };
      const expectedResult = new RegisteredUser(payload);
      
      const mockUserRepository = new UserRepository();
      mockUserRepository.restoreBy = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const userManUseCase = new UserManUserCase(mockUserRepository);

      // Action
      const result = await userManUseCase.restore(payload.id);

      // Assert
      expect(mockUserRepository.restoreBy).toBeCalledWith('id', payload.id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('destroy function', () => {
    it('should function correctly', async () => {
      // Arrange
      const id = 'user_id';
      
      const mockUserRepository = new UserRepository();
      mockUserRepository.destroyBy = jest.fn().mockImplementation(() => Promise.resolve());
      const userManUseCase = new UserManUserCase(mockUserRepository);

      // Action
      await userManUseCase.destroy(id);

      // Assert
      expect(mockUserRepository.destroyBy).toBeCalledWith('id', id);
    });
  });

  describe('permanentDestroy function', () => {
    it('should function correctly', async () => {
      // Arrange
      const id = 'user_id';
      
      const mockUserRepository = new UserRepository();
      mockUserRepository.permanentDestroyBy = jest.fn().mockImplementation(() => Promise.resolve());
      const userManUseCase = new UserManUserCase(mockUserRepository);

      // Action
      await userManUseCase.permanentDestroy(id);

      // Assert
      expect(mockUserRepository.permanentDestroyBy).toBeCalledWith('id', id);
    });
  });
});

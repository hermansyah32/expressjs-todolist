import TodoManUserCase from "../TodoManUseCase";
import TodoRepository from "../../../../Domains/todos/TodoRepository";
import IndexSchema from "../../../../Domains/IndexSchema";
import CreateTodo from "../../../../Domains/todos/schemas/CreateTodo";
import CreatedTodo from "../../../../Domains/todos/schemas/CreatedTodo";

describe('TodoManUserCase', () => {
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
      const mockTodoRepository = new TodoRepository();
      mockTodoRepository.index = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const todoManUseCase = new TodoManUserCase({todoRepository: mockTodoRepository});

      // Action
      const result = await todoManUseCase.index(payload);

      // Assert
      expect(mockTodoRepository.index).toBeCalled();
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
      const mockTodoRepository = new TodoRepository();
      mockTodoRepository.indexTrashed = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const todoManUseCase = new TodoManUserCase({todoRepository: mockTodoRepository});

      // Action
      const result = await todoManUseCase.indexTrashed(payload);

      // Assert
      expect(mockTodoRepository.indexTrashed).toBeCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('store function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        todo: 'Take a note',
        description: 'Key point of javascript',
      };
      const createTodo = new CreateTodo(payload);
      const expectedResult = new CreatedTodo(createTodo);
      
      const mockTodoRepository = new TodoRepository();
      mockTodoRepository.store = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const todoManUseCase = new TodoManUserCase({todoRepository: mockTodoRepository});

      // Action
      const result = await todoManUseCase.store(payload);

      // Assert
      expect(mockTodoRepository.store).toBeCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('show function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        id: 'todo_id',
        todo: 'Take a note',
        description: 'Key point of javascript',
      };
      const expectedResult = new CreatedTodo(payload);
      
      const mockTodoRepository = new TodoRepository();
      mockTodoRepository.getBy = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const todoManUseCase = new TodoManUserCase({todoRepository: mockTodoRepository});

      // Action
      const result = await todoManUseCase.show(payload.id);

      // Assert
      expect(mockTodoRepository.getBy).toBeCalledWith('id', payload.id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('showTrashed function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        id: 'todo_id',
        todo: 'Take a note',
        description: 'Key point of javascript',
      };
      const expectedResult = new CreatedTodo(payload);
      
      const mockTodoRepository = new TodoRepository();
      mockTodoRepository.getTrashedBy = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const todoManUseCase = new TodoManUserCase({todoRepository: mockTodoRepository});

      // Action
      const result = await todoManUseCase.showTrashed(payload.id);

      // Assert
      expect(mockTodoRepository.getTrashedBy).toBeCalledWith('id', payload.id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        id: 'todo_id',
        todo: 'Take a note',
        description: 'Key point of javascript',
      };
      const expectedResult = new CreatedTodo(payload);
      
      const mockTodoRepository = new TodoRepository();
      mockTodoRepository.updateBy = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const todoManUseCase = new TodoManUserCase({todoRepository: mockTodoRepository});

      // Action
      const result = await todoManUseCase.update(payload.id, {todo: 'Javascript Presentation Title'});

      // Assert
      expect(mockTodoRepository.updateBy).toBeCalledWith('id', payload.id, {todo: 'Javascript Presentation Title'});
      expect(result).toEqual(expectedResult);
    });
  });

  describe('restore function', () => {
    it('should function correctly', async () => {
      // Arrange
      const payload = {
        id: 'todo_id',
        todo: 'Take a note',
        description: 'Key point of javascript',
      };
      const expectedResult = new CreatedTodo(payload);
      
      const mockTodoRepository = new TodoRepository();
      mockTodoRepository.restoreBy = jest.fn().mockImplementation(() => Promise.resolve(expectedResult));
      const todoManUseCase = new TodoManUserCase({todoRepository: mockTodoRepository});

      // Action
      const result = await todoManUseCase.restore(payload.id);

      // Assert
      expect(mockTodoRepository.restoreBy).toBeCalledWith('id', payload.id);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('destroy function', () => {
    it('should function correctly', async () => {
      // Arrange
      const id = 'todo_id';
      
      const mockTodoRepository = new TodoRepository();
      mockTodoRepository.destroyBy = jest.fn().mockImplementation(() => Promise.resolve());
      const todoManUseCase = new TodoManUserCase({todoRepository: mockTodoRepository});

      // Action
      await todoManUseCase.destroy(id);

      // Assert
      expect(mockTodoRepository.destroyBy).toBeCalledWith('id', id);
    });
  });

  describe('permanentDestroy function', () => {
    it('should function correctly', async () => {
      // Arrange
      const id = 'todo_id';
      
      const mockTodoRepository = new TodoRepository();
      mockTodoRepository.permanentDestroyBy = jest.fn().mockImplementation(() => Promise.resolve());
      const todoManUseCase = new TodoManUserCase({todoRepository: mockTodoRepository});

      // Action
      await todoManUseCase.permanentDestroy(id);

      // Assert
      expect(mockTodoRepository.permanentDestroyBy).toBeCalledWith('id', id);
    });
  });
});

import knex from 'knex';
import { testing } from '../../database/knexfile';
import TodoKnexRepository from '../TodoKnexRepository';
import TodoRepository from '../../../Domains/todos/TodoRepository';
import IndexSchema from '../../../Domains/IndexSchema';
import { attachPaginate } from 'knex-paginate';
import CreateTodo from '../../../Domains/todos/schemas/CreateTodo';
import dayjs from 'dayjs';

describe('TodoKnexRepository', () => {
  beforeAll(async () => {
    attachPaginate();
  });

  beforeEach(async () => {
    await knex(testing)(TodoRepository.tableName).truncate();
  });

  describe('index function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const indexSchema = new IndexSchema();
      const todoRepository = new TodoKnexRepository(knexConfig);
      const createTodo = new CreateTodo({
        todo: 'Take a note',
        description: 'Key point of Javascript',
      });
      await knexConfig(TodoRepository.tableName).insert(createTodo);
      // Action
      const result = await todoRepository.index(indexSchema);
      // Assert
      expect(result.data.length).toBeGreaterThan(0);
    });
  });

  describe('indexTrashed function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const indexSchema = new IndexSchema();
      const todoRepository = new TodoKnexRepository(knexConfig);
      const userPayload = new CreateTodo({
        todo: 'Take a note',
        description: 'Key point of Javascript',
      });
      await knexConfig(TodoRepository.tableName).insert(
        Object.assign(userPayload, {
          deleted_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })
      );
      // Action
      const result = await todoRepository.indexTrashed(indexSchema);
      // Assert
      expect(result.data.length).toBeGreaterThan(0);
    });
  });

  describe('store function', () => {
    it('should running correctly', async () => {
      // Arrange
      const createTodo = new CreateTodo({
        todo: 'Take a note',
        description: 'Key point of Javascript',
      });
      const knexConfig = knex(testing);
      const todoRepository = new TodoKnexRepository(knexConfig);

      // Action
      const result = await todoRepository.store(createTodo);

      // Assert
      expect(result.id).toEqual(createTodo.id);
      expect(result.todo).toEqual(createTodo.todo);
      expect(result.description).toEqual(createTodo.description);
    });
  });

  describe('getBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const createTodo = new CreateTodo({
        todo: 'Take a note',
        description: 'Key point of Javascript',
      });
      const todoRepository = new TodoKnexRepository(knexConfig);
      await knexConfig(TodoRepository.tableName).insert(createTodo);

      // Action
      const result = await todoRepository.getBy('id', createTodo.id);

      // Assert
      expect(result.id).toBeTruthy();
      expect(result.todo).toEqual(createTodo.todo);
      expect(result.description).toEqual(createTodo.description);
    });
  });

  describe('getByTrashed function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const todoRepository = new TodoKnexRepository(knexConfig);
      const createTodo = new CreateTodo({
        todo: 'Take a note',
        description: 'Key point of Javascript',
      });
      await knexConfig(TodoRepository.tableName).insert(
        Object.assign(createTodo, {
          deleted_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })
      );

      // Action
      const result = await todoRepository.getTrashedBy('id', createTodo.id);

      // Assert
      expect(result.id).toBeTruthy;
      expect(result.todo).toEqual(createTodo.todo);
      expect(result.description).toEqual(createTodo.description);
    });
  });

  describe('updateBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const createTodo = new CreateTodo({
        todo: 'Take a note',
        description: 'Key point of Javascript',
      });
      const newTodo = {
        todo: 'Take some practice',
        description: 'Create todo app with NodeJS',
      };
      const todoRepository = new TodoKnexRepository(knexConfig);
      await knexConfig(TodoRepository.tableName).insert(createTodo);

      // Action
      const result = await todoRepository.updateBy(
        'id',
        createTodo.id,
        newTodo
      );

      // Assert
      expect(result.id).toBeTruthy();
      expect(result.todo).toEqual(newTodo.todo);
      expect(result.description).toEqual(newTodo.description);
    });
  });

  describe('restoreBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const createTodo = new CreateTodo({
        todo: 'Take a note',
        description: 'Key point of Javascript',
      });
      const todoRepository = new TodoKnexRepository(knexConfig);
      await knexConfig(TodoRepository.tableName).insert(
        Object.assign(createTodo, {
          deleted_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })
      );

      // Action
      const result = await todoRepository.restoreBy('id', createTodo.id);

      // Assert
      expect(result.id).toBeTruthy();
      expect(result.todo).toEqual(createTodo.todo);
      expect(result.description).toEqual(createTodo.description);
      expect(result.deleted_at).toBeNull();
    });
  });

  describe('destroyBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const todoRepository = new TodoKnexRepository(knexConfig);
      const createTodo = new CreateTodo({
        todo: 'Take a note',
        description: 'Key point of Javascript',
      });
      await knexConfig(TodoRepository.tableName).insert(createTodo);

      // Action
      await todoRepository.destroyBy('id', createTodo.id);

      // Assert
      const result = await knexConfig(TodoRepository.tableName)
        .where('id', createTodo.id)
        .whereNotNull('deleted_at');
      expect(result[0].id).toBeTruthy();
      expect(result[0].todo).toEqual(createTodo.todo);
      expect(result[0].description).toEqual(createTodo.description);
      expect(result[0].deleted_at).not.toBeNull();
    });
  });

  describe('permanentDestroyBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const todoRepository = new TodoKnexRepository(knexConfig);
      const createTodo = new CreateTodo({
        todo: 'Take a note',
        description: 'Key point of Javascript',
      });
      await knexConfig(TodoRepository.tableName).insert(
        Object.assign(createTodo, {
          deleted_at: dayjs().format('YYYY-MM_DD HH:mm:ss'),
        })
      );

      // Action
      await todoRepository.permanentDestroyBy('id', createTodo.id);

      // Assert
      const result = await knexConfig(TodoRepository.tableName).where(
        'id',
        createTodo.id
      );
      expect(result.length).toEqual(0);
    });
  });
});

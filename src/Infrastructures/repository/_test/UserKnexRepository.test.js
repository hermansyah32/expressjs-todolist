import knex from 'knex';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import GeneratedToken from '../../../Domains/authentications/schemas/GeneratedToken';
import { testing } from '../../database/knexfile';
import { testing as testingEnv } from '../../../../tests/knexfileTestHelper';
import DatabaseError from '../../../Commons/exceptions/DatabaseError';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';
import UserKnexRepository from '../UserKnexRepository';
import UserRepository from '../../../Domains/users/UserRepository';
import IndexSchema from '../../../Domains/IndexSchema';
import { attachPaginate } from 'knex-paginate';
import RegisterUser from '../../../Domains/users/schemas/RegisterUser';
import dayjs from 'dayjs';

describe('UserKnexRepository', () => {
  beforeAll(async () => {
    attachPaginate();
  });

  beforeEach(async () => {
    await knex(testing)(UserRepository.tableName).truncate();
  });

  describe('index function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const indexSchema = new IndexSchema();
      const userRepository = new UserKnexRepository(knexConfig);
      const registerUser = new RegisterUser({
        username: 'newUsername',
        email: 'new@user.com',
        fullname: 'New User',
        password: 'password',
      });
      await knexConfig(UserRepository.tableName).insert(registerUser);
      // Action
      const result = await userRepository.index(indexSchema);
      // Assert
      expect(result.data.length).toBeGreaterThan(0);
    });
  });

  describe('indexTrashed function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const indexSchema = new IndexSchema();
      const userRepository = new UserKnexRepository(knexConfig);
      const userPayload = new RegisterUser({
        username: 'newUsername',
        email: 'new@user.com',
        fullname: 'New User',
        password: 'password',
      });
      await knexConfig(UserRepository.tableName).insert(
        Object.assign(userPayload, {
          deleted_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })
      );
      // Action
      const result = await userRepository.indexTrashed(indexSchema);
      // Assert
      expect(result.data.length).toBeGreaterThan(0);
    });
  });

  describe('store function', () => {
    it('should running correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'newUsername',
        email: 'new@user.com',
        fullname: 'New User',
        password: 'password',
      });
      const knexConfig = knex(testing);
      const userRepository = new UserKnexRepository(knexConfig);

      // Action
      await userRepository.store(registerUser);

      // Assert
      const result = await knexConfig(UserRepository.tableName).where(
        'email',
        registerUser.email
      );
      expect(result[0].id).toEqual(registerUser.id);
      expect(result[0].username).toEqual(registerUser.username);
      expect(result[0].email).toEqual(registerUser.email);
      expect(result[0].fullname).toEqual(registerUser.fullname);
    });
  });

  describe('getBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const registerUser = new RegisterUser({
        username: 'newUsername',
        email: 'new@user.com',
        fullname: 'New User',
        password: 'password',
      });
      const userRepository = new UserKnexRepository(knexConfig);
      await knexConfig(UserRepository.tableName).insert(registerUser);

      // Action
      const result = await userRepository.getBy('email', registerUser.email);

      // Assert
      expect(result.id).not.toBeUndefined();
      expect(result.id).not.toBeNull();
      expect(result.username).toEqual(registerUser.username);
      expect(result.email).toEqual(registerUser.email);
      expect(result.fullname).toEqual(registerUser.fullname);
    });
  });

  describe('getByTrashed function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const userRepository = new UserKnexRepository(knexConfig);
      const registerUser = new RegisterUser({
        username: 'newUsername',
        email: 'new@user.com',
        fullname: 'New User',
        password: 'password',
      });
      await knexConfig(UserRepository.tableName).insert(
        Object.assign(registerUser, {
          deleted_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })
      );

      // Action
      const result = await userRepository.getTrashedBy(
        'email',
        registerUser.email
      );

      // Assert
      expect(result.id).not.toBeUndefined();
      expect(result.id).not.toBeNull();
      expect(result.username).toEqual(registerUser.username);
      expect(result.email).toEqual(registerUser.email);
      expect(result.fullname).toEqual(registerUser.fullname);
    });
  });

  describe('updateBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const registerUser = new RegisterUser({
        username: 'newUsername',
        email: 'new@user.com',
        fullname: 'New User',
        password: 'password',
      });
      const newFullname = 'Edited New User';
      const userRepository = new UserKnexRepository(knexConfig);
      await knexConfig(UserRepository.tableName).insert(registerUser);

      // Action
      const result = await userRepository.updateBy(
        'email',
        registerUser.email,
        { fullname: newFullname }
      );

      // Assert
      expect(result.id).not.toBeUndefined();
      expect(result.id).not.toBeNull();
      expect(result.username).toEqual(registerUser.username);
      expect(result.email).toEqual(registerUser.email);
      expect(result.fullname).toEqual(newFullname);
    });
  });

  describe('restoreBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const registerUser = new RegisterUser({
        username: 'newUsername',
        email: 'new@user.com',
        fullname: 'New User',
        password: 'password',
      });
      const userRepository = new UserKnexRepository(knexConfig);
      await knexConfig(UserRepository.tableName).insert(
        Object.assign(registerUser, {
          deleted_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        })
      );

      // Action
      await userRepository.restoreBy('email', registerUser.email);

      // Assert
      const result = await knexConfig(UserRepository.tableName).where(
        'email',
        registerUser.email
      );
      expect(result[0].id).not.toBeUndefined();
      expect(result[0].id).not.toBeNull();
      expect(result[0].username).toEqual(registerUser.username);
      expect(result[0].email).toEqual(registerUser.email);
      expect(result[0].fullname).toEqual(registerUser.fullname);
    });
  });

  describe('destroyBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const userRepository = new UserKnexRepository(knexConfig);
      const registerUser = new RegisterUser({
        username: 'newUsername',
        email: 'new@user.com',
        fullname: 'New User',
        password: 'password',
      });
      await knexConfig(UserRepository.tableName).insert(registerUser);

      // Action
      await userRepository.destroyBy('email', registerUser.email);

      // Assert
      const result = await knexConfig(UserRepository.tableName)
        .where('email', registerUser.email)
        .whereNotNull('deleted_at');
      expect(result[0].id).not.toBeUndefined();
      expect(result[0].id).not.toBeNull();
      expect(result[0].username).toEqual(registerUser.username);
      expect(result[0].email).toEqual(registerUser.email);
      expect(result[0].fullname).toEqual(registerUser.fullname);
      expect(result[0].deleted_at).not.toBeNull();
    });
  });

  describe('permanentDestroyBy function', () => {
    it('should running correctly', async () => {
      // Arrange
      const knexConfig = knex(testing);
      const userRepository = new UserKnexRepository(knexConfig);
      const registerUser = new RegisterUser({
        username: 'newUsername',
        email: 'new@user.com',
        fullname: 'New User',
        password: 'password',
      });
      await knexConfig(UserRepository.tableName).insert(
        Object.assign(registerUser, {
          deleted_at: dayjs().format('YYYY-MM_DD HH:mm:ss'),
        })
      );

      // Action
      await userRepository.permanentDestroyBy('email', registerUser.email);

      // Assert
      const result = await knexConfig(UserRepository.tableName).where(
        'email',
        registerUser.email
      );
      expect(result.length).toEqual(0);
    });
  });
});

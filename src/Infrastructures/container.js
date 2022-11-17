import { createContainer } from 'instances-container';

// required dependencies
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import knex from 'knex';
import { attachPaginate } from 'knex-paginate';
import * as KnexEnv from '../Infrastructures/database/knexfile';
import { getClient as redisClient } from './session/redisClient';

// services (repository, helper, manager, etc)
// -- Security section
import PasswordHash from '../Applications/security/PasswordHash';
import BcryptPasswordHash from './security/BcryptPasswordHash';
import TokenManager from '../Applications/security/TokenManager';
import JwtTokenManager from './security/JwtTokenManager';

// -- Authentication Token section
import TokenRepository from '../Domains/authentications/TokenRepository';
import TokenKnexRepository from './repository/TokenKnexRepository';

// -- User repository
import UserRepository from '../Domains/users/UserRepository';
import UserKnexRepository from './repository/UserKnexRepository';

// -- Todo Repository
import TodoRepository from '../Domains/todos/TodoRepository';
import TodoKnexRepository from './repository/TodoKnexRepository';

// use case section
// -- use case auth
import AuthLoginUseCase from '../Applications/use_case/authentication/AuthLoginUseCase';
import AuthLogoutUseCase from '../Applications/use_case/authentication/AuthLogoutUseCase';
import AuthRefreshAccessUseCase from '../Applications/use_case/authentication/AuthRefreshAccessUseCase';
import RegisterUserUseCase from '../Applications/use_case/authentication/RegisterUserUseCase';

// -- use case todo manager
import TodoManUserCase from '../Applications/use_case/todo/TodoManUseCase';

// -- use case user manager
import UserManUserCase from '../Applications/use_case/user/UserManUseCase';
import SessionRepository from '../Domains/session/SessionRepository';
import SessionRedisRepository from './repository/SessionRedisRepository';

// -- knex config
let knexConfig;
switch (process.env.NODE_ENV) {
  case 'prod' || 'production':
    knexConfig = KnexEnv.production;
    break;
  case 'test' || 'testing':
    knexConfig = KnexEnv.testing;
    break;
  default:
    knexConfig = KnexEnv.development;
    break;
}
attachPaginate();
const knexMod = knex(knexConfig);

// Create container
const container = createContainer();

container.register([
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [{ concrete: bcrypt }],
    },
  },
  {
    key: TokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [{ concrete: jwt }],
    },
  },
  {
    key: TokenRepository.name,
    Class: TokenKnexRepository,
    parameter: {
      dependencies: [{ concrete: knexMod }],
    },
  },
  {
    key: UserRepository.name,
    Class: UserKnexRepository,
    parameter: {
      dependencies: [{ concrete: knexMod }],
    },
  },
  {
    key: TodoRepository.name,
    Class: TodoKnexRepository,
    parameter: {
      dependencies: [{ concrete: knexMod }],
    },
  },
  {
    key: SessionRepository.name,
    Class: SessionRedisRepository,
    parameter: {
      dependencies: [{ concrete: redisClient() }],
    },
  },
]);

container.register([
  {
    key: AuthLoginUseCase.name,
    Class: AuthLoginUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'tokenManager', internal: TokenManager.name },
        { name: 'tokenRepository', internal: TokenRepository.name },
        { name: 'userRepository', internal: UserRepository.name },
        { name: 'passwordHash', internal: PasswordHash.name },
      ],
    },
  },
  {
    key: AuthLogoutUseCase.name,
    Class: AuthLogoutUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'tokenRepository', internal: TokenRepository.name },
        { name: 'sessionRepository', internal: SessionRepository.name },
      ],
    },
  },
  {
    key: AuthRefreshAccessUseCase.name,
    Class: AuthRefreshAccessUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'tokenManager', internal: TokenManager.name },
        { name: 'sessionRepository', internal: SessionRepository.name },
      ],
    },
  },
  {
    key: RegisterUserUseCase.name,
    Class: RegisterUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'tokenManager', internal: TokenManager.name },
        { name: 'tokenRepository', internal: TokenRepository.name },
        { name: 'userRepository', internal: UserRepository.name },
        { name: 'passwordHash', internal: PasswordHash.name },
      ],
    },
  },
]);

container.register([
  {
    key: UserManUserCase.name,
    Class: UserManUserCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        { name: 'userRepository', internal: UserRepository.name },
        { name: 'test', concrete: 4 },
      ],
    },
  },
]);

container.register([
  {
    key: TodoManUserCase.name,
    Class: TodoManUserCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [{ name: 'todoRepository', internal: TodoRepository.name }],
    },
  },
]);

export default container;

import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import UserRepository from '../src/Domains/users/UserRepository';
import RegisterUser from '../src/Domains/users/schemas/RegisterUser';
import BcryptPasswordHash from '../src/Infrastructures/security/BcryptPasswordHash';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  try {
    // Delete all existing entries
    await knex(UserRepository.tableName).del();
    const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

    // Create admin user
    // TODO: authorization not implement yet
    const default_password = 'password';
    const hashed_password = await bcryptPasswordHash.hash(default_password, 10);
    const adminUser = new RegisterUser({
      username: 'hermansyah32',
      email: 'me@hermansyah.dev',
      fullname: 'Hermansyah',
      password: hashed_password,
    });

    await knex(UserRepository.tableName).insert(adminUser);

    // Create regular user
    const otherUser = [];
    for (let index = 0; index < 10; index++) {
      const tempUser = new RegisterUser({
        fullname: faker.name.fullName(),
        email: faker.internet.email(),
        username: faker.internet.email(),
        password: hashed_password,
      });
      otherUser.push(tempUser);
    }

    await knex(UserRepository.tableName).insert(otherUser);
  } catch (error) {
    console.log('UserSeeder error :>> ', error);
  }
}

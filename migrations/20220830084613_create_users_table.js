import UserRepository from "../src/Domains/users/UserRepository";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(UserRepository.tableName, function (table) {
    table.string("id").primary();
    table.string('fullname', 255).notNullable();
    table.string('username', 255).unique().notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('password', 255).notNullable();
    table.datetime('deleted_at').defaultTo(null); // implement soft delete
    table.timestamps();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists(UserRepository.tableName);
}

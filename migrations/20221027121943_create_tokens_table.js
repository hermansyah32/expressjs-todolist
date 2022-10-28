import TokenRepository from "../src/Domains/authentications/TokenRepository";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(TokenRepository.tableName, function (table) {
    table.string('token').primary();
    table.timestamps();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTableIfExists(TokenRepository.tableName);
}

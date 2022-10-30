import TodoRepository from "../src/Domains/todos/TodoRepository";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(TodoRepository.tableName, function (table) {
    table.string('id').primary();
    table.string('todo').notNullable();
    table.text('description');
    table.string('author_id').defaultTo(null);
    table.datetime('deleted_at').defaultTo(null);
    table.timestamps();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists(TodoRepository.tableName);
}

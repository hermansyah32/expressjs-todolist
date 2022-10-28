// Update with your config settings.
import { resolve } from 'path';
import * as Constants from '../../Commons/Constants/common';
const migrationPath = resolve('../../../migrations');
const seederPath = resolve('../../../seeders');

const commonSettings = {
  client: 'mysql2',
  connection: {
    host: Constants.DATABASE_HOST,
    port: Constants.DATABASE_PORT,
    user: Constants.DATABASE_USER,
    password: Constants.DATABASE_PASS,
    database: Constants.DATABASE_NAME,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: migrationPath,
  },
  seeds: {
    directory: seederPath,
  },
  useNullAsDefault: true,
};
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = { ...commonSettings };
export const testing = { ...commonSettings };
export const production = { ...commonSettings };

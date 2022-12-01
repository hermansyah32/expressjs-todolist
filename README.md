# Installation
This application need Redis and MySQL/Mariadb.
# Commands

- `yarn test` Run jest test.
- `yarn knex migrate:latest` Run knex migration.
- `yarn knex seed:run` Run seeder.
- `yarn knex:test` Run knex command with `.env.testing` file config.

# Commit Rules

- `feature` Feature related changing. Could be add, update/modify, delete, move, etc.
- `add` Adding non related feature.
- `remove` Remove non related feature.
- `update` Update non-related feature.
- `fix` Modify and fix feature bug.

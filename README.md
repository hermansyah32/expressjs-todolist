# Commands

- `yarn test` Run jest test.
- `yarn knex migrate:latest` Run knex migration.
- `yarn knex seed:run` Run seeder.

# Known Issues

- `Model` using objection is not supported batch insert yet. Should use `knex('tablename').insert(<array>)`

# Commit Rules

- `feature` Feature related changing. Could be add, update/modify, delete, move, etc.
- `add` Adding non related feature.
- `remove` Remove non related feature.
- `update` Update non-related feature.
- `fix` Modify and fix feature bug.

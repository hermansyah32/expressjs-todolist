import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dayjs from 'dayjs';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class CreatedTodo {
  /**
   * Constructor class.
   * @param {{ id, todo, description, author_id }} payload
   */
  constructor(payload) {
    this._verifyInput(payload);

    const {
      id,
      todo,
      description,
      author_id,
      deleted_at,
      created_at,
      updated_at,
    } = payload;
    this.id = id;
    this.todo = todo;
    this.description = description;
    this.author_id = author_id;
    this.deleted_at = deleted_at;
    this.created_at = created_at;
    this.updated_at = updated_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  assign({ todo, description, author_id }) {
    const currentId = this.id;
    if (!currentId)
      throw new InvariantError('Assignment should from data instance');
    this._verifyInput({ currentId, todo, description, author_id });
    this.todo = todo;
    this.description = description;
    this.author_id = author_id;
    this.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  with(relationName) {
    // Empty
  }

  _relationAuthor() {
    // Empty
  }

  _verifyInput({ id, todo, description, author_id }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ id, todo, description, author_id });
    if (!isValid)
      throw new ValidationError(
        'SCHEMA_CREATED_TODO.VALIDATION_ERROR',
        validate.errors
      );
  }

  _jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        todo: { type: 'string' },
        description: { type: 'string' },
        author_id: { type: ['null', 'string'] },
      },
      required: ['id', 'todo'],
      additionalProperties: false,
    };
  }
}

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dayjs from 'dayjs';
import shortUUID from 'short-uuid';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class CreateTodo {
  /**
   * Constructor class.
   * @param {{ todo, description, author_id }} payload
   */
  constructor(payload) {
    payload.author_id = author_id || null;
    this._verifyInput(payload);

    const { todo, description, author_id, created_at, updated_at } = payload;
    this.id = shortUUID().new();
    this.todo = todo;
    this.description = description;
    this.author_id = author_id;
    this.created_at = created_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.updated_at = updated_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  _verifyInput({ todo, description, author_id }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ todo, description, author_id });
    if (!isValid)
      throw new ValidationError(
        'SCHEMA_CREATE_TODO.VALIDATION_ERROR',
        validate.errors
      );
  }

  _jsonSchema() {
    return {
      type: 'object',
      properties: {
        todo: { type: 'string' },
        description: { type: 'string' },
        author_id: { type: ['null', 'string'] },
      },
      required: ['todo'],
      additionalProperties: false,
    };
  }
}

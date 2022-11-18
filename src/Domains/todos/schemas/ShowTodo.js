import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class ShowTodo {
  /**
   * Constructor class.
   * @param {{ id, author_id }} payload
   */
  constructor(payload) {
    payload.author_id = author_id || null;
    this._verifyInput(payload);

    const { id, author_id } = payload;
    this.id = id;
    this.author_id = payload.author_id;
  }

  _verifyInput({ id, author_id }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ id, author_id });
    if (!isValid)
      throw new ValidationError(
        'SCHEMA_SHOW_TODO.VALIDATION_ERROR',
        validate.errors
      );
  }

  _jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        author_id: { type: ['null', 'string'] },
      },
      required: ['id'],
      additionalProperties: false,
    };
  }
}

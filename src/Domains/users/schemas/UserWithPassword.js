import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dayjs from 'dayjs';
import shortUUID from 'short-uuid';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class PasswordUser {
  /**
   * Constructor class.
   * @param {{ id, password }} payload
   */
  constructor(payload) {
    this._verifyInput(payload);

    const { id, username, email, fullname, password, created_at, updated_at } =
      payload;
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  _verifyInput({ id, username, email, fullname, password }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ id, username, email, fullname, password });
    if (!isValid)
      throw new ValidationError(
        'SCHEMA_PASSWORD_USER.VALIDATION_ERROR',
        validate.errors
      );
  }

  _jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        fullname: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['id', 'password'],
      additionalProperties: false,
    };
  }
}

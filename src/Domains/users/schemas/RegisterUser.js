import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dayjs from 'dayjs';
import shortUUID from 'short-uuid';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class RegisterUser {
  /**
   * Constructor class.
   * @param {{ username, email, fullname, password }} payload
   */
  constructor(payload) {
    this._verifyInput(payload);

    const { username, email, fullname, password, created_at, updated_at } =
      payload;
    this.id = shortUUID().new();
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.password = password;
    this.deleted_at = null;
    this.created_at = created_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.updated_at = updated_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  _verifyInput({ username, email, fullname, password }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ username, email, fullname, password });
    if (!isValid)
      throw new ValidationError(
        'SCHEMA_REGISTER_USER.VALIDATION_ERROR',
        validate.errors
      );
  }

  _jsonSchema() {
    return {
      type: 'object',
      properties: {
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        fullname: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'fullname', 'password'],
      additionalProperties: false,
    };
  }
}

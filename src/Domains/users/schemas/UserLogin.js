import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class UserLogin {
  /**
   * Constructor class.
   * @param {{ username, password }} payload
   */
  constructor(payload) {
    if (payload.username.includes('@')) payload.email = payload.username;

    this._verifyInput(payload);

    const { username, email, password } = payload;
    this.username = username;
    this.email = email || username;
    this.password = password;
  }

  _verifyInput({ username, email, password }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ username, email, password });
    if (!isValid)
      throw new ValidationError(
        'SCHEMA_USER_LOGIN.VALIDATION_ERROR',
        validate.errors
      );
  }

  _jsonSchema() {
    return {
      type: 'object',
      properties: {
        username: { type: 'string' },
        email: { type: ['string', 'null'], format: 'email' },
        password: { type: 'string' },
      },
      required: ['password'],
      additionalProperties: false,
    };
  }
}

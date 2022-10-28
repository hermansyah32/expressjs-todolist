import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dayjs from 'dayjs';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class GeneratedToken {
  constructor(payload) {
    this._verifyInput(payload);

    const { token, created_at, updated_at } = payload;
    this.token = token;
    this.created_at = created_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.updated_at = updated_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  _verifyInput({ token }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ token });
    if (!isValid)
      throw new ValidationError(
        'SCHEMA_GENERATED_TOKEN.VALIDATION_ERROR',
        validate.errors
      );
  }

  _jsonSchema() {
    return {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
      required: ['token'],
      additionalProperties: false,
    };
  }
}

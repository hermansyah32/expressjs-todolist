import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dayjs from 'dayjs';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class AuthToken {
  constructor(payload) {
    this._verifyInput(payload);

    const { accessToken, refreshToken } = payload;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  _verifyInput({ accessToken, refreshToken }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ accessToken, refreshToken });
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
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
      required: ['accessToken', 'refreshToken'],
      additionalProperties: false,
    };
  }
}

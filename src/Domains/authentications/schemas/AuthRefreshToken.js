import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class AuthRefreshToken {
  constructor(payload) {
    this._verifyInput(payload);

    const { refreshToken } = payload;
    this.refreshToken = refreshToken;
  }

  _verifyInput({ refreshToken }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ refreshToken });
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
        refreshToken: { type: 'string' },
      },
      required: ['refreshToken'],
      additionalProperties: false,
    };
  }
}

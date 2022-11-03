import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class AuthAccessToken {
  constructor(payload) {
    this._verifyInput(payload);

    const { accessToken } = payload;
    this.accessToken = accessToken;
  }

  _verifyInput({ accessToken }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ accessToken });
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
      },
      required: ['accessToken'],
      additionalProperties: false,
    };
  }
}

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class DataToken {
  constructor(payload) {
    this._verifyInput(payload);

    const { accessToken, refreshToken, dataPayload } = payload;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.dataPayload = dataPayload; // data payload get from accessToken
  }

  _verifyInput({ accessToken, refreshToken, dataPayload }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ accessToken, refreshToken, dataPayload });
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
        dataPayload: {
          type: 'object',
          properties: {
            iat: { type: 'number' },
            exp: { type: 'number' },
            session: { type: 'string' },
            username: { type: 'string' },
          },
          required: ['session', 'username', 'iat', 'exp'],
        },
      },
      required: ['accessToken', 'refreshToken', 'dataPayload'],
      additionalProperties: false,
    };
  }
}

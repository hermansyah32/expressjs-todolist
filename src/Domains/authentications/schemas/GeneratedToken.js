import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dayjs from 'dayjs';
import ValidationError from '../../../Commons/exceptions/ValidationError';
import { REFRESH_TOKEN_EXPIRE } from '../../../Commons/Constants/common';

export default class GeneratedToken {
  constructor(payload) {
    this._verifyInput(payload);

    const { token, expired_at, created_at, updated_at } = payload;
    this.token = token;
    this.expired_at = expired_at;
    this.created_at = created_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.updated_at = updated_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  _verifyInput({ token, expired_at }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ token, expired_at });
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
        expired_at: { type: ['string'], format: 'date-time' },
      },
      required: ['token', 'expired_at'],
      additionalProperties: false,
    };
  }
}

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dayjs from 'dayjs';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class RegisteredUser {
  /**
   * Constructor class.
   * @param {{ id, username, email, fullname }} payload
   * @param {bool} isUpdate
   */
  constructor(payload, isUpdate = false) {
    this._verifyInput(payload);

    const { id, username, email, fullname, deleted_at, created_at, updated_at } = payload;
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.deleted_at = deleted_at;
    this.created_at = created_at;
    this.updated_at = isUpdate ? dayjs().format('YYYY-MM-DD HH:mm:ss') : updated_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  assign({username, email, fullname}){
    const id = this.id
    if (!id) 
      throw new InvariantError('Assignment should from data instance');
    this._verifyAssign({id, username, email, fullname});
    if (username) this.username = username;
    if (email) this.email = email;
    if (fullname) this.fullname = fullname;
    this.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  _verifyAssign({ id, username, email, fullname }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ id, username, email, fullname });
    if (!isValid)
      throw new ValidationError(
        'SCHEMA_REGISTERED_USER.VALIDATION_ERROR',
        validate.errors
      );
  }

  _verifyInput({ id, username, email, fullname }) {
    const AJVInstance = new Ajv();
    addFormats(AJVInstance);

    const validate = AJVInstance.compile(this._jsonSchema());
    const isValid = validate({ id, username, email, fullname });
    if (!isValid)
      throw new ValidationError(
        'SCHEMA_REGISTERED_USER.VALIDATION_ERROR',
        validate.errors
      );
  }

  _assignJsonSchema() {
    return {
      type: 'object',
      oneOf: [
        {
          properties: {
            id: { type: 'string' },
            username: { type: ['string', 'null'] },
            email: { type: 'string', format: 'email' },
            fullname: { type: ['string', 'null'] },
          },
        },
        {
          properties: {
            id: { type: 'string' },
            username: { type: ['string', 'null'] },
            email: { type: 'null' },
            fullname: { type: ['string', 'null'] },
          },
        }
      ],
      required: ['id'],
      additionalProperties: false,
    };
  }

  _jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        fullname: { type: 'string' },
      },
      required: ['id'],
      additionalProperties: false,
    };
  }
}

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dayjs from 'dayjs';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import ValidationError from '../../../Commons/exceptions/ValidationError';

export default class RegisteredUser {
  /**
   * Constructor class.
   * @param {{ id, username, email, fullname }} payload
   */
  constructor(payload) {
    this._verifyInput(payload);

    const { id, username, email, fullname, deleted_at, created_at, updated_at } = payload;
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.deleted_at = deleted_at;
    this.created_at = created_at;
    this.updated_at = updated_at || dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  assign({username, email, fullname}){
    const currentId = this.id
    if (!currentId) 
      throw new InvariantError('Assignment should from data instance');
    this._verifyInput({currentId, username, email, fullname});
    this.username = username;
    this.email = email;
    this.fullname = fullname;
    this.updated_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
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

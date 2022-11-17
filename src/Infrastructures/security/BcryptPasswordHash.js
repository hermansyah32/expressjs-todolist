import PasswordHash from '../../Applications/security/PasswordHash';
import AuthenticationError from '../../Commons/exceptions/AuthenticationError';

export default class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  async compare(password, hashedPassword) {
    const result = await this._bcrypt.compare(password, hashedPassword);
    return result;
  }
}

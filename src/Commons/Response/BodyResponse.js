export class ResponseCode {
  static OK = 200;
  static NOT_AUTHENTICATED = 401;
  static NOT_FOUND = 404;
  static SERVER_ERROR = 403;
  static VALIDATION_ERROR = 422;
  static NOT_ACCEPTABLE = 406;
  static TOO_MANY_REQUEST = 429;
}

export class BodyResponse {
  /** @type {number} */
  #code = ResponseCode.OK;
  /** @type {'OK'|'BAD'|'WARNING'} */
  #status = 'OK';

  #data = [];
  #error = [];
  #message = '';
  #token = null;

  /** @param {number} code */
  setCode(code) {
    this.#code = code;
    return this;
  }

  getCode() {
    return this.#code;
  }

  /** @param {'OK'|'BAD'|'WARNING'} status */
  setStatus(status) {
    this.#status = status;
    return this;
  }

  getStatus() {
    return this.#status;
  }

  setMessage(message) {
    this.#message = message;
    return this;
  }

  getMessage() {
    return this.#message;
  }

  setData(data) {
    this.#data = data;
    return this;
  }

  getData() {
    return this.#data;
  }

  setToken(token) {
    this.#token = token;
    return this;
  }

  getToken() {
    return this.#token;
  }

  /**
   * Set error response
   * @param {string} message Response string
   * @param {number} code Response http code
   */
  setResponseError(message, code = ResponseCode.SERVER_ERROR) {
    this.#message = message;
    this.#code = code;
    this.#status = 'BAD';
    return this;
  }

  /**
   * Set authentication error response
   * @param {string} message Response string
   */
  setAuthenticationError(message) {
    this.#message = message;
    this.#code = ResponseCode.NOT_AUTHENTICATED;
    this.#status = 'BAD';
    return this;
  }

  /**
   * Set not found error response
   * @param {string} message Response string
   */
  setNotFoundError(message) {
    this.#message = message;
    this.#code = ResponseCode.NOT_FOUND;
    this.#status = 'BAD';
    return this;
  }

  /**
   * Set validation error response
   * @param {string} message Response string
   * @param {object} data Validation error object
   */
  setValidationError(message, data) {
    this.#message = message;
    this.#code = ResponseCode.VALIDATION_ERROR;
    this.#data = data;
    this.#status = 'BAD';
    return this;
  }

  /**
   * Generate plain object
   */
  build() {
    const tempObject = {
      response: {
        code: this.#code,
        status: this.#status,
      },
      body: {
        message: this.#message,
        data: this.#data,
      },
    };

    if (Array.isArray(this.#error) && this.#error.length > 0) tempObject.body.error = this.#error;
    if (!Array.isArray(this.#error) && !this.#error) tempObject.body.error = this.#error;

    if (this.#token){
      tempObject.body.token = this.#token;
    }

    return tempObject;
  }
}

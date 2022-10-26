class error_Object {
    constructor(message, statusCode, error) {
      (this.message = message), (this.statusCode = statusCode);
      this.error = error;
    }
  }
  module.exports = {error_Object}
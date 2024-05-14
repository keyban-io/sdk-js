export type ServerErrorTypes = "OFFLINE";

class ServerError extends Error {
  constructor(code: ServerErrorTypes) {
    super(code);
    this.name = "ServerError";
    this.stack = new Error().stack;
  }
}

export default ServerError;

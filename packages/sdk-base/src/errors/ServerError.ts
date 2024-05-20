export enum ServerErrors {
	OFFLINE = 'OFFLINE',
}

/**
 * @category errors
 * Error class for server side related errors.
 */
export class ServerError extends Error {
	constructor(code: ServerErrors) {
		super(code);
		this.name = 'ServerError';
		this.stack = new Error().stack;
	}
}

export default ServerError;

export default class StatusError extends Error {
    constructor( message, code, data ) {
        super( message );
        this.code = code;
        this.data = typeof data !== 'undefined' ? data : null;
    }
}
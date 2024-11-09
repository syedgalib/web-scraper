export default class Request {
    req;

    constructor( req ) {
        this.req = req;
    }

    url() {
        return this.req.url;
    }

    isRootURL() {
        return this.url() === '/';
    }

    query( key ) {
        return key ? this.req.query[ key ] : { ...this.req.query };
    }

    hasQuery( key ) {
        return { ...this.req.query }.hasOwnProperty( key );
    }

    params( key ) {
        return key ? this.req.params[ key ] : this.req.params;
    }

    body() {
        return this.req.body;
    }

    header( key ) {
        return key ? this.req.headers[ key ] : this.req.headers;
    }
}
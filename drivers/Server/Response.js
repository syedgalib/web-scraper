export default class Response {
    res;

    constructor( res ) {
        this.res = res;
    }

    send( content, option ) {
        return {};
    }

    end( content ) {
        return this.res.end( content );
    }
    
    json( data, option ) {
        option = option ? option : {};

        const statusCode = typeof option.statusCode === 'undefined' ? 200 : option.statusCode;
        
        return this.res.status( statusCode ).send( data );
    }
}
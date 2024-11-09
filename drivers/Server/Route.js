import Request from "./Request.js";
import Response from "./Response.js";

export default class Route {
    app;

    constructor( app ) {
        this.app = app;
    }

    get( path, handler ) {
        this.app.get( path, ( request, reply ) => {
            return handler( new Request( request ), new Response( reply ) );
        } );
    }

    post( path, handler ) {
        this.app.post( path, ( request, reply ) => {
            return handler( new Request( request ), new Response( reply ) );
        } );
    }

    patch( path, handler ) {
        this.app.patch( path, ( request, reply ) => {
            return handler( new Request( request ), new Response( reply ) );
        } );
    }

    delete( path, handler ) {
        this.app.delete( path, ( request, reply ) => {
            return handler( new Request( request ), new Response( reply ) );
        } );
    }
}
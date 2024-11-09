/** @import App from '#root/App.js' */

export default class Auth {
    app;

    /**
     * 
     * @param {App} app 
     */
    constructor( app ) {
        if ( app ) {
            this.app = app;
        }
    }

    async handle( req, res, next ) {
        const accessKey = req.header( 'access_key' );

        this.app.config.app.general.accessKey;

        if ( accessKey !== this.app.config.app.general.accessKey ) {
            next( new Error( 'Forbidden' ) );
            return;
        }

        next();
    }
}
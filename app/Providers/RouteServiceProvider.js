import Routes from '#app/Routes/index.js';
/** @import App from '#root/App.js' */

export default class RouteServiceProvider {
    app;

    /**
     * 
     * @param {App} app 
     */
    constructor( app ) {
        this.app = app;
    }

    boot() {
        new Routes( this.app );
    }
}
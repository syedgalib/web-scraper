import ScraperRoute from '#app/Routes/ScraperRoute.js';
import middlewares from "#app/Http/Middleware/index.js";
/** @import App from '#root/App.js' */

export default class Routes {
    app;

    /**
     * 
     * @param {App} app 
     */
    constructor( app ) {
        this.app = app;

        this.addMiddleware();
        this.initRoutes();
    }

    addMiddleware() {
        this.app.driver.server.use( middlewares.auth.bind( this.app ) );
    }

    initRoutes() {
        new ScraperRoute( this.app );
    }
}
import GoogleScraperController from '#app/Http/Controllers/GoogleScraperController.js';

/** @import App from '#root/App.js' */
/** @import Route from '#root/drivers/Server/Route.js' */

export default class ScraperRoute {
    /**
     * @type {Route}
     */
    route;

    /**
     * @type { GoogleScraperController }
     */
    googleScraperController;
    
    /**
     * 
     * @param {App} app 
     */
    constructor( app ) {
        this.route      = app.driver.server.route;
        this.googleScraperController = new GoogleScraperController( app );

        this.initRoutes();
    }   

    // Init Routes
    initRoutes() {
        this.route.get( '/google-reviews', this.googleScraperController.getReviews.bind( this.googleScraperController ) );
    }

}
import { filterByAcceptedKeys, isNumeric } from "#app/Helper/helpers.js";
import GoogleScraper from "#app/Scrapers/GoogleScraper.js";

export default class GoogleScraperController {
    /**
     * @type { GoogleScraper }
     */
    scraper;

    constructor() {
        this.scraper = new GoogleScraper();
    }

    // Get Reviews
    async getReviews( req, res ) {
        try {
            const params = this.#getReviewParams( req );
            
            const data = await this.scraper.getReviews( params );

            res.json( data );
        } catch ( error ) {
            this.#sendError( res, error );
        }
    }

    // Get Review Params
    #getReviewParams( req, acceptedKeys ) {
        const args = req.body() ? req.body() : {};
        
        acceptedKeys = acceptedKeys ? acceptedKeys : [ 'id' ];

        filterByAcceptedKeys( acceptedKeys, args );

        if ( args.hasOwnProperty( 'id' ) ) {
            args.id = isNumeric( args.id ) ? parseInt( args.id ) : 0;
        }

        return args;
    }

    // Send Error
    #sendError( res, error ) {
        const data = {
            data: typeof error.data !== 'undefined' ? error.data : null,
            message: error.message,
        };

        res.json( data, { statusCode: error.code ? error.code : 403 } );
    }
}
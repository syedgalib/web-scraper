import puppeteer from 'puppeteer';

export default class GoogleScraper {
    
    async getReviews( args ) {
        const data = await this.scrapReviews();

        return { data };
    }

    async scrapReviews() {
        const browser = await puppeteer.launch();
        const page    = await browser.newPage();
        
        const url = 'https://www.google.com/search?q=Katz%E2%80%99s+Delicatessen&oq=Katz%E2%80%99s+Delicatessen&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzI3OGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x89c2598f7ff4aa09:0x313547e757cb8cea,1,,,,';
        
        await page.goto( url );
    
        await page.waitForSelector( '.review-dialog-top', { visible: true } );
    
        const reviews = await page.evaluate(() => {
            const reviews = {};

            const photoElements = document.querySelectorAll('.rAChLe.review-dialog .EDblX .JrO5Xe');
    
            if ( ! photoElements.length ) {
                return reviews;
            }
    
            let photos = [];
    
            for( const element of photoElements ) {
                const photoLink = element.getAttribute( 'style' ).match( /^background-image:url\(([^)]+)\)$/ );

                if ( photoLink ) {
                    photos.push( photoLink[1] );
                }
            }

            reviews.photos = photos;
    
            return reviews;
        });

        return reviews;
    }
    
}
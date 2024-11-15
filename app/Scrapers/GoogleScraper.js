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
    
       return await page.evaluate(() => {

            let reviewsData = [];

            const reviewsElements = document.querySelectorAll('.WMbnJf.vY6njf.gws-localreviews__google-review');
    
            if ( ! reviewsElements.length ) {
                return reviewsData;
            }
        
            for (const reviewElement of reviewsElements) {
                const singleReview = {};
            
                // Extract author's name
                const authorNameElement = reviewElement.querySelector('.TSUbDb a');
                singleReview.authorName = authorNameElement ? authorNameElement.textContent.trim() : 'Unknown';
            
                // Extract author's image
                const authorImageElement = reviewElement.querySelector('.lDY1rd');
                singleReview.authorImage = authorImageElement ? authorImageElement.getAttribute('src') : '';
            
                // Extract author tag (e.g., Local Guide)
                const authorTagElement = reviewElement.querySelector('.QV3IV');
                singleReview.authorTag = authorTagElement ? authorTagElement.textContent.trim() : 'No Tag';
            
                // Extract review rating
                const ratingElement = reviewElement.querySelector('.lTi8oc.z3HNkc');
                singleReview.rating = ratingElement ? ratingElement.getAttribute('aria-label') : 'No Rating';
            
                // Extract date of review
                const dateElement = reviewElement.querySelector('.dehysf.lTi8oc');
                singleReview.date = dateElement ? dateElement.textContent.trim() : 'Unknown Date';
            
                // Extract full review text if available, otherwise fallback to snippet
                const fullReviewTextElement = reviewElement.querySelector('.review-full-text');
                const snippetReviewElement = reviewElement.querySelector('.review-snippet');
                singleReview.reviewText = fullReviewTextElement && fullReviewTextElement.style.display === 'none'
                    ? fullReviewTextElement.textContent.trim()
                    : snippetReviewElement
                    ? snippetReviewElement.textContent.trim()
                    : 'No Review Text';
            
                // Extract metadata (e.g., Food, Service, Atmosphere ratings) as key-value pairs
                const metaElements = reviewElement.querySelectorAll('.k8MTF span');
                singleReview.meta = metaElements
                    ? Array.from(metaElements)
                          .filter(meta => meta.textContent.includes(':')) // Ensure it's a key-value style
                          .map(meta => {
                              const [key, value] = meta.textContent.split(':').map(str => str.trim());
                              return { key, value };
                          })
                    : [];
            
                // Extract image links associated with the review
                const imageElements = reviewElement.querySelectorAll('div.JrO5Xe');
                singleReview.imageLinks = imageElements
                    ? Array.from(imageElements).map(imgElement => {
                        // Extract background-image URL from inline style
                        const backgroundImage = imgElement.style.backgroundImage;
                        const match = backgroundImage.match(/url\(["']?(.+?)["']?\)/);
                        if (match) {
                            return match[1].replace(/w\d+-h\d+/, 'w800-h500'); // Replace wX-hY with w800-h500
                        }
                        return null;
                      }).filter(Boolean) // Remove null values
                    : [];
            
                // Add the processed review to the data array
                reviewsData.push(singleReview);
            }

            return reviewsData;
        });
    }

    async scrapReviewsV2() {
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
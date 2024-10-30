import puppeteer from 'puppeteer';

async function scrap() {
    const browser = await puppeteer.launch();
    const page    = await browser.newPage();
    
    const url = 'https://www.google.com/search?q=Katz%E2%80%99s+Delicatessen&oq=Katz%E2%80%99s+Delicatessen&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzI3OGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x89c2598f7ff4aa09:0x313547e757cb8cea,1,,,,';
    
    await page.goto( url );

    await page.waitForSelector( '.review-dialog-top', { visible: true } );

    const content = await page.evaluate(() => {
        const elements = document.querySelectorAll('.rAChLe.review-dialog .EDblX .JrO5Xe');

        if ( ! elements.length ) {
            return null;
        }

        let links = [];

        for( const element of elements ) {
            links.push( element.getAttribute( 'style' ) );
        }

        return links;
    });

    console.log( { content } );
}

scrap();
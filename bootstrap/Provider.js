/** @import App from '#root/App.js' */

export default class Provider {
    /**
     * 
     * @param {App} app 
     * @returns 
     */
    async boot( app ) {
        if ( typeof app.config.app.providers === 'undefined' ) {
            return;
        }

        if ( ! Array.isArray( app.config.app.providers ) ) {
            return;
        }

        await this.initProviders( app.config.app.providers, app );
    }

    async initProviders( providers, app ) {
        for ( const Provider of providers ) {
            const providerInstance = new Provider( app );

            if ( typeof providerInstance.boot !== 'function' ) {
                continue;
            }

            await providerInstance.boot();
        }
    }

}
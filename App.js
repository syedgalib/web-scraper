import ServerDriver from '#root/drivers/Server/Driver.js';
import Provider from '#root/bootstrap/Provider.js';
import config from '#root/config/index.js';

console.log( { config } );

export default class App {
    driver = {};
    config = config;

    // Constructor
    constructor() {
        // Boot the application
        this.#boot();
    }

    // Boot the application
    async #boot() {
        // Setup Drivers
        await this.#setuplDrivers();

        // Init Providers
        const provider = new Provider();
        await provider.boot( this );

        // Run The Server
        this.driver.server.run();
    }

    // Setup Drivers
    async #setuplDrivers() {
        // Setup Server
        await this.#setupServer();
    }

    // Setup Server
    async #setupServer() {
        const server = new ServerDriver(
            { 
                port: config.app.general.server.port 
            } 
        );

        await server.setup();

        this.driver.server = server;
    }
}
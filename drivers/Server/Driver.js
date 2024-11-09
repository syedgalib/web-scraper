import Fastify from 'fastify';
import middie from '@fastify/middie';
import cors from '@fastify/cors'
import Request from './Request.js';
import Response from './Response.js';
import Route from './Route.js';

export default class Driver {
    app;
    route;
    port = 3000;

    constructor( config ) {
        if ( ! config ) {
            return;
        }

        if ( config.port ) {
            this.port = config.port;
        }
    }

    async setup() {
        this.app = Fastify({ logger: false });

        await this.app.register( middie );
        await this.app.register( cors, { origin: '*' });

        this.httpServer = this.app.server;
        this.route = new Route( this.app );
    }

    run() {
        const app  = this.app;
        const port = this.port;

        if ( ! this.app ) {
            return;
        }

        this.app.listen( { port: this.port }, function ( err, address ) {
            if ( err ) {
                app.log.error(err);
                process.exit(1);
            }

            console.log(`App listening on http://localhost:${ port }`);
        });
    }

    use( callback ) {
        this.app.use( ( req, res, next ) => {
            const nextCallback = ( data ) => {
                next( data );
            };

            callback(
                new Request( req ),
                new Response( res ),
                nextCallback,
            );
        } );
    }
}
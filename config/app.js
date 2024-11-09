import RouteServiceProvider from '#app/Providers/RouteServiceProvider.js';

export default {
    general: {
        accessKey: 'abc_123',
        server: {
            port: 3000,
        },
    },
    providers: [
        RouteServiceProvider,
    ],
};
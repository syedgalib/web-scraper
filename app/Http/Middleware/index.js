import Auth from "./Auth.js";

const middlewares = {
    auth: function( ...args ) {
        const middleware = new Auth( this );
        return middleware.handle( ...args );
    },
};

export default middlewares;
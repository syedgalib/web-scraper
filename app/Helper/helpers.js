export function isObject( data ) {
    return data && typeof data === 'object' && ! Array.isArray( data );
}

export function maybeHandleBulkCallback( callback, data, ...args ) {
    args = args ? args : [];

    if ( typeof data === 'string' ) {
        callback( data, ...args );
        return;
    }

    if ( Array.isArray( data ) ) {
        for ( const item of data ) {
            callback( item, ...args );
        }
    }
}

export function isValidEmail( email ) {
    return email.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null;
};

// Parse URL
export function parseURL( url ) {
    if ( typeof url !== 'string' ) {
        return url;
    }

    return url.replace( /^(http[s]?:[\/]+)?/, '' );
}

// Filter by keys
export function filterByKeys( keys, data ) {
    if ( ! Array.isArray( keys ) ) {
        return;
    }

    if ( ! isObject( data ) ) {
        return;
    }

    for( const key of keys ) {
        if ( data.hasOwnProperty( key ) ) {
            delete data[ key ];
        }
    }
}

// Filter by accepted keys
export function filterByAcceptedKeys( acceptedKeys, data ) {
    if ( ! Array.isArray( acceptedKeys ) ) {
        return;
    }

    if ( ! isObject( data ) ) {
        return;
    }

    for( const dataKey of Object.keys( data ) ) {
        if ( ! acceptedKeys.includes( dataKey ) ) {
            delete data[ dataKey ];
        }
    }
}

export function isNumeric( n ) {
    return ! isNaN( n );
}

export function maybeyTruthy( value ) {
    return value === true || value === 1 || value === '1';
}

export async function config( path, defaultValue ) {
    return await maybeImport( `#root/config/${path}`, true, defaultValue );
}

export async function maybeImport( path, withDefault, defaultValue ) {
    let file;

    try {
        file = await import( `${path}.dev.js` );
    } catch (_) {}

    if ( file ) {
        return withDefault ? file.default : file;
    }

    try {
        file = await import( `${path}.js` );
    } catch (_) {}

    if ( typeof file === 'undefined' ) {
        return defaultValue;
    }

    return withDefault ? file.default : file;
}
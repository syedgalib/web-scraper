import Model from "#root/drivers/Database/Model.js";

export default class BandwidthModel extends Model {
    constructor( databaseDriver ) {
        super( 'bandwidth', databaseDriver );
    }

    /**
     * @returns {Model}
     */
    static getInstance( databaseDriver ) {
        if ( null === this.instance ) {
            this.instance = new BandwidthModel( databaseDriver );
        }

        return this.instance;
    }
}
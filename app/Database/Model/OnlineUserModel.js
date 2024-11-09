import Model from "#root/drivers/Database/Model.js";

export default class OnlineUserModel extends Model {
    constructor( databaseDriver ) {
        super( 'online_user', databaseDriver );
    }

    /**
     * @returns {Model}
     */
    static getInstance( databaseDriver ) {
        if ( null === this.instance ) {
            this.instance = new OnlineUserModel( databaseDriver );
        }

        return this.instance;
    }
}
import Model from "#root/drivers/Database/Model.js";

export default class UserModel extends Model {
    constructor( databaseDriver ) {
        super( 'user', databaseDriver );
    }

    /**
     * @returns {Model}
     */
    static getInstance( databaseDriver ) {
        if ( null === this.instance ) {
            this.instance = new UserModel( databaseDriver );
        }

        return this.instance;
    }
}
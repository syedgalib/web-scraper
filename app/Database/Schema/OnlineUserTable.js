import Schema from "#root/drivers/Database/Schema.js";

export default class OnlineUserTable extends Schema {
    schema = {
        userID: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            required: true,
        },
        watchUsers: {
            type: Array,
            required: false,
            default: [],
        },
        watchGroups: {
            type: Array,
            required: false,
            default: [],
        },
        socketIDs: {
            type: Array,
            required: true,
        },
    };
}
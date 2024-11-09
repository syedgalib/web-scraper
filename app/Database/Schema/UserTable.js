import Schema from "#root/drivers/Database/Schema.js";

export default class UserTable extends Schema {
    schema = {
        userID: {
            type: Number,
            required: true,
        },
        website: {
            type: String,
            required: true,
        },
        quota: {
            type: Number,
            required: true,
        },
        isUnlimited: {
            type: Boolean,
            required: false,
            default: false,
        },
        token: {
            type: String,
            required: false,
        },
    };

    option = {
        timestamps: true,
    }
}
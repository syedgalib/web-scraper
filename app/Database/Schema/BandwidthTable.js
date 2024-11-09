import Schema from "#root/drivers/Database/Schema.js";

export default class BandwidthTable extends Schema {
    schema = {
        website: {
            type: String,
            required: true,
        },
        event: {
            type: String,
            required: true,
        },
        transfer: {
            type: Number,
            required: false,
        },
        receive: {
            type: Number,
            required: false,
        },
    };

    option = {
        timestamps: false,
    }
}
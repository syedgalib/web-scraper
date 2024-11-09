import { config } from "#app/Helper/helpers.js";

const app = await config( 'app', {} );

export default {
    app,
}
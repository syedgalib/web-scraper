import UserTable from "./UserTable.js";
import OnlineUserTable from "./OnlineUserTable.js";
import BandwidthTable from "./BandwidthTable.js";

const Schema = {
    user: UserTable,
    online_user: OnlineUserTable,
    bandwidth: BandwidthTable,
};

export default Schema;
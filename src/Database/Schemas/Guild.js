const mongo = require("mongoose");
const config = require("../../Constants/Config");

module.exports = mongo.model("Guilds", new mongo.Schema({
    id: { type: String, required: true },
    config: {
        prefix: { type: String, default: config.defaultPrefix },
        welcomeMsg: {
            id: { type: String, required: false },
            token: { type: String, required: false },
            msg: { type: String, required: false },
        },
        leaveMsg: {
            id: { type: String, required: false },
            token: { type: String, required: false },
            msg: { type: String, required: false },
        }
    },

}))
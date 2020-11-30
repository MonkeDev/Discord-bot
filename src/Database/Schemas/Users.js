const mongo = require("mongoose");

module.exports = mongo.model("Users", new mongo.Schema({
    id: { type: String, required: true },
    economy: {
        money: {
            wallet: { type: Number, default: 5000 },
            inBank: { type: Number, default: 0 },
            bankSpace: { type: Number, default: 1000 },
            multi: { type: Number, default: 1 }
        }
    },
    profile: {
        totalUsedCommands: { type: Number, default: 0 },
        embedColor: { type: Number, default: 0x0a0000 },
        name: { type: String, default: null },
        bio: { type: String, default: null },
        twitter: { type: String, default: null },
        insta: { type: String, default: null },
        twitch: { type: String, default: null },
        tiktok: { type: String, default: null},
        youtube: { type: String, default: null },
        dscbio: { type: String, default: null },
    }
    
}))
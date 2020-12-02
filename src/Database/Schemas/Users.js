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
        name: { type: String, required: false },
        bio: { type: String, required: false },
        twitter: { type: String, required: false },
        insta: { type: String, required: false },
        twitch: { type: String, required: false },
        github: { type: String, required: false },
        youtube: { type: String, required: false },
        dscbio: { type: String, required: false },
    }
    
    
}))
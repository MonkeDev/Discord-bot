const mongo = require("mongoose");

module.exports = mongo.model("Users", new mongo.Schema({
    id: { type: String, required: true },
    economy: {
        money: {
            wallet: { type: Number, default: 5000 },
            inBank: { type: Number, default: 0},
            bankSpace: { type: Number, default: 1000},
            multi: { type: Number, default: 1}
        }
    },
    prem: {
        tier: { type: Number, default: 1 }
    }
    

}))
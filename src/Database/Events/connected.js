const mongo = require('mongoose');
module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(){
        console.log("Mongo is now connected")
    }
}
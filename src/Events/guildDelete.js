const guilds = require("../Database/Schemas/Guild");
module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(guild){
        guilds.findOneAndDelete({id: guild.id});
    }
}
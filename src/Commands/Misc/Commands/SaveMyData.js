const prettyMs = require("pretty-ms");

const baseCmd = require("../../../Structors/Command");
module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "save-my-data",
            alli: ["save"],
            dms: true,
            category: "Misc",
            description: "Using this command will save all of your unsaved data\n\u3000Premium have there data saved automatically :smirk:",
            usage: "save-my-data",
            cooldown: 7000
        })
    }

    async run(msg, args, data){

        await this.bot.updateUserDataCahe(data.author.id, data.author);

        msg.channel.sendGreenEmbed("All of your data has been saved");
       
    }
}
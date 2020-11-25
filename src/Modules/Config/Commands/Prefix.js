const prettyMs = require("pretty-ms");

const baseCmd = require("../../../Structors/Command");
module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-prefix",
            category: "Config",
            description: "Gives your server a custom prefix",
            usage: "set-prefix <prefix>",
            cooldown: 5000,
            mPerms: ["manageGuild"],

        })
    }

    async run(msg, args, data){
        
        let newPrefix = args[0];
        if(!newPrefix) return msg.channel.sendRedEmbed('A new prefix is **required**.');

        data.guild.config.prefix = newPrefix;
        await this.bot.updateGuildDataCache(msg.channel.guild.id, data.guild);

        msg.channel.sendGreenEmbed(`Success the prefix on your server is not **${data.guild.config.prefix}**`);

        
    }
}
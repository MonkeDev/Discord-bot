const prettyMs = require("pretty-ms");

const baseCmd = require("../../../Structors/Command");
module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "ping",
            dms: true,
            category: "Misc",
            description: "Shows you the bots ping",
            usage: "ping"
        })
    }

    async run(msg, args, data){

        let shard = msg.channel.guild.shard;
        let pingingMessage = await msg.channel.send(`Pinging shard ${shard.id}...`);
        pingingMessage.edit({embed: {
            color: shard.latency > 120 ? this.bot.constants.Colors.red : this.bot.constants.Colors.green,
            author: {
                name: `Shard ${shard.id}`,
                //icon_url: this.bot.user.avatarURL
            },
            description: `API: ${shard.latency}\nEdit: ${Date.now() - pingingMessage.createdAt}`
        }, content: ""})

        
    }
}
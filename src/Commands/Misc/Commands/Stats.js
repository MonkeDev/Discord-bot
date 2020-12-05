const prettyMs = require("pretty-ms");

const baseCmd = require("../../../Structors/Command");
module.exports = class extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "stats",
            alli: ["ping", "shard"],
            dms: true,
            category: "Misc",
            description: "Shows you some bot stats",
            usage: "stats"
        })
    }

    async run(msg, args, data){

        let shard = msg.channel.guild.shard;
        let pingingMessage = await msg.channel.send(`Pinging shard ${shard.id}...`);
        //description: `API: ${shard.latency}\nEdit: ${Date.now() - pingingMessage.createdAt}`
        

        let toEdit = {
            content: "",
            embed: {
                author: {
                    name: this.bot.user.tag,
                    icon_url: this.bot.user.avatarURL,
                },
                color: this.bot.constants.Colors.main,
                fields: [],
                footer: {
                    text: 'Dev: Mafia#7777'
                }
            }
        }
        toEdit.embed.fields.push({name: "__Latency__", value: `**Shard**: ${prettyMs(shard.latency)}\n**Edit time**: ${prettyMs(Date.now() - pingingMessage.createdAt)}\n**Database**: ${prettyMs(data.guild.fetchTime)}`, inline: true});
        toEdit.embed.fields.push({name: "__Cache__", value: `**Users**: ${this.bot.users.size}\n**Guilds**: ${this.bot.guilds.size}\n**DB Users**: ${this.bot.cache.users.size}\n**DB Guilds**: ${this.bot.cache.guilds.size}`, inline: true});
        toEdit.embed.fields.push({name: '__Uptime__', value: `**Bot**: ${prettyMs(this.bot.uptime)}\n**Process**: ${prettyMs(process.uptime() * 1000)}`, inline: true})
        pingingMessage.edit(toEdit);

        
    }
}
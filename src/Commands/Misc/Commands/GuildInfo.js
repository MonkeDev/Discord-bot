let region = {
    "brazil": ":flag_br: Brazil",
    "eu-central": ":flag_eu: Central Europe",
    "singapore": ":flag_sg: Singapore",
    "london": ":flag_gb: London",
    "russia": ":flag_ru: Russia",
    "japan": ":flag_jp: Japan",
    "hongkong": ":flag_hk: Hongkong",
    "sydney": ":flag_sy: Sydney",
    "us-central": ":flag_us: U.S. Central",
    "us-east": ":flag_us: U.S. East",
    "us-south": ":flag_us: U.S. South",
    "us-west": ":flag_us: U.S. West",
    "eu-west": ":flag_eu: Western Europe",
    "europe": ":flag_eu: Europe",
    "india": ":flag_in: India"
}

const prettyMs = require("pretty-ms");
const baseCmd = require("../../../Structors/Command");
module.exports = class extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "serverinfo",
            alli: ["server", "guildinfo", "guild"],
            category: "Misc",
            description: "Give you some server info",
            usage: "serverinfo"
        })
    }

    async run(msg, args, data){


        let guild = msg.channel.guild;
        let toSend = {
            content: `Guild info on ${guild.name}.`,
            embed: {
                author: {
                    name: guild.name,
                    icon_url: guild.iconURL
                },
                color: this.bot.constants.Colors.main,
                fields: [],
                footer: {
                    text: `ID: ${guild.id}`
                },
                description: `**Owner**: <@!${guild.ownerID}>`
            }
        }

        toSend.embed.fields.push({name: '__Members__', value: `**Users**: \`${guild.members.filter(x => !x.bot).length}\`\n**Bots**: \`${guild.members.filter(x => x.bot).length}\`\n**Total**: \`${guild.memberCount}\``, inline: true});
        toSend.embed.fields.push({name: '__Channels__', value: `**Text**: \`${guild.channels.filter(x => x.type == 0 || x.type == 5 || x.type == 6).length}\`\n**Vc**: \`${guild.channels.filter(x => x.type == 2).length}\``, inline: true});
        toSend.embed.fields.push({name: '__Roles/Emojis__', value: `**Roles**: \`${guild.roles.size}\`\n**Emojis**: \`${guild.emojis.length}\``, inline: true})
        toSend.embed.fields.push({name: '__Boost__', value: `**Tier**: \`${guild.premiumTier}\`\n**Count**: \`${guild.premiumSubscriptionCount}\``, inline: true});
        toSend.embed.fields.push({name: '__Region__', value: `${Object.getOwnPropertyDescriptor(region, guild.region).value}`, inline: true});
        toSend.embed.fields.push({name: '__Bot joined__', value: prettyMs(Date.now() - guild.joinedAt), inline: true})
        toSend.embed.fields.push({name: '__Guild features__', value: `\`${guild.features.length != 0 ? guild.features.join("\n` `") : "None"}\``})



        msg.channel.send(toSend);

    

        
    }
}
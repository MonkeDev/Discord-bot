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

const baseCmd = require("../../../Structors/Command");
module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "serverinfo",
            alli: ["server"],
            category: "Misc",
            description: "Give you some server info",
            usage: "serverinfo"
        })
    }

    async run(msg, args, data){


        let guild = msg.channel.guild;
        console.log(guild.members)
        let embed = {
            color: this.bot.constants.Colors.main,
            author: {
                name: guild.name,
                icon_url: guild.iconURL
            },
            description: `**Owner**: <@!${guild.ownerID}>\n\n**ID**: ${guild.id}\n**Region**: ${Object.getOwnPropertyDescriptor(region, guild.region).value}\n\n**Members**: ${guild.memberCount}\n**Channels**: ${guild.channels.size}`
        }

        msg.channel.send({embed: embed});

    

        
    }
}
const prettyMs = require("pretty-ms");

const baseCmd = require("../../../Structors/Command");
module.exports = class extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "privacy",
            dms: true,
            category: "Misc",
            description: "Tells you how we store your data",
            usage: "privacy [guild | user]"
        })
    }

    async run(msg, args, data){

        let embed = {
            color: this.bot.constants.Colors.main,
            title: `Privacy`,
            fields: [],
            description: ""
        }

        if(!args[0]){
            embed.description = `All of your data is stored in [Mongodb](https://mongodb.com/) a very secure database as an [object](https://www.w3schools.com/js/js_objects.asp). None of your data will ever be shared, The only thing/person with access to it is the bot owner and the bot itself. if you wish to have any of your data deleted you can come visit our [support server](https://discord.gg/tqeyYrS43A)\n\nFor more info --> ${data.guild.config.prefix}${this.usage}`;
            return msg.channel.send({embed: embed});
        }
        if(args[0].toLowerCase() == "guild"){
            embed.description = "All guild data is also stored with your guild ID";
            embed.fields.push({name: 'Custom prefix', value: "For custom prefix we only store the **prefix**"});
            embed.fields.push({name: 'Welcome and leave messages', value: 'For welcome and leave messages we store **Webhook ID**, **Webhook token**, and the **Welcome message**', inline: true});
            return msg.channel.send({embed: embed}); 
        }else if(args[0].toLowerCase() == "user"){
            embed.description = "We do not store user data yet";
            return msg.channel.send({embed: embed}); 
        }else{
            return msg.reply(`**${args[0]}** is not a options`);
        }
        
       
        
        
    

        
    }
}
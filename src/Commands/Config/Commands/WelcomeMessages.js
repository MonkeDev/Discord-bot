const prettyMs = require("pretty-ms");

const baseCmd = require("../../../Structors/Command");
module.exports = class extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "welcome-message",
            alli: ["welcomemessage", "welcome-msg", "welcomemsg"],
            category: "Config",
            description: "__Info__\n\u3000\u3000Sets up a welcome message on your server\n\u3000__Tags__\n\u3000\u3000{member.username}\n\u3000\u3000{member.mention}\n\u3000\u3000{guild.name}\n\u3000\u3000{guild.memberCount}\n\u3000\u3000{member.tag}",
            usage: "__Enabling__:\n\u3000\u3000welcome-message <enable | set | add> <channel> <welcome message>\n\u3000__Disabling__:\n\u3000\u3000welcome-message <remove | disable | delete>",
            cooldown: 5000,
            mPerms: ["manageGuild", "manageWebhooks"],
            bPerms: ["manageWebhooks"],
            addPrefix: "false"

        })
    }

    async run(msg, args, data){

        if(!args[0]) return msg.channel.sendRedEmbed("Please provide a option")

        if(args[0].toLowerCase() == "set" || args[0].toLowerCase() == "add" || args[0].toLowerCase() == "enable"){

            if(data.guild.config.welcomeMsg.id && data.guild.config.welcomeMsg.token) return msg.channel.sendRedEmbed("Welcome messages are already enabled please disable them first");

            let channel = msg.channelMentions[0] ? msg.channel.guild.channels.get(msg.channelMentions[0]) : null || await msg.channel.guild.channels.get(args[1]) || await msg.channel.guild.channels.find(x => x.name == args[1]);
            if(!channel) return msg.channel.sendRedEmbed('Please provide a valid channel')
    
            let welcomeMessage = args.slice(2).join(" ");
            if(!welcomeMessage) return msg.channel.sendRedEmbed('Please provide a welcome message')
            let webHook;
            try{
                webHook = await channel.createWebhook({
                    name: this.bot.user.username,
                }, "Welcome messages where enabled")
            }catch(err){
                if(err == "DiscordRESTError [30007]: Maximum number of webhooks reached (10)") return msg.channel.sendRedEmbed("This channel is at its maximum number of webhooks (10)")
                else return msg.channel.sendRedEmbed('An error occurred while creating the webhook, ' + err)
            }
            
    
            data.guild.config.welcomeMsg = {
                id: webHook.id,
                token: webHook.token,
                msg: welcomeMessage
            }
            

            await this.bot.updateGuildDataCache(msg.channel.guild.id, data.guild);
            
    
            await this.bot.executeWebhook(webHook.id, webHook.token, {
                content: await this.bot.structorMessage(msg.channel.guild, msg.member, welcomeMessage),
                allowedMentions: {
                    everyone: false,
                    roles: false,
                    users: true
                },
                username: this.bot.user.username,
                avatarURL: this.bot.user.staticAvatarURL,
            })
    
            msg.channel.sendGreenEmbed(`Welcome messages will now go to <#${channel.id}>`);
        }else if(args[0].toLowerCase() == "remove" || args[0].toLowerCase() == "delete" || args[0].toLowerCase() == "disable"){

            if(!data.guild.config.welcomeMsg.id && !data.guild.config.welcomeMsg.token) return msg.channel.sendRedEmbed("Welcome messages are not enabled");
            try{
                await this.bot.deleteWebhook(data.guild.config.welcomeMsg.id, data.guild.config.welcomeMsg.token, "Welcome messages where disabdle");
            }catch(err){
                if(err != "DiscordRESTError [10015]: Unknown Webhook") return msg.channel.sendRedEmbed('An error occurred while deleting the webhook, ' + err);
            }
            

            data.guild.config.welcomeMsg = {
                id: null,
                token: null,
                msg: null
            }
    
            await this.bot.updateGuildDataCache(msg.channel.guild.id, data.guild);

            msg.channel.sendGreenEmbed("Welcome messages are now disabled");
        }else{
            msg.channel.sendRedEmbed(`**${args[0]}** is not a option`)
        }
        


    }
}
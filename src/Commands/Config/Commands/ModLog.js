const prettyMs = require("pretty-ms");

const baseCmd = require("../../../Structors/Command");
module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "mod-logs",
            alli: ["mod-log", "modlogs", "modlog"],
            category: "Config",
            description: "Enables/Disabled your modlog on your serevr.",
            usage: "mod-logs <enable | disable> [channel]",
            cooldown: 5000,
            mPerms: ["manageGuild", "manageWebhooks"],
            bPerms: ["manageWebhooks"],
        })
    }

    async run(msg, args, data){
        
        let option = args[0];
        if(!option) return msg.reply("Please provide a option.");
        option = option.toLowerCase();
        let channel = msg.channelMentions[0] ? msg.channel.guild.channels.get(msg.channelMentions[0]) : null || msg.channel;

        if(option == "enable"){
            if(data.guild.config.modLog.id && data.guild.config.modLog.token) return msg.reply("Mod-logs are already enabled please disable first!");
            let webHook;
            try{
                webHook = await channel.createWebhook({
                    name: this.bot.user.username,
                }, `${msg.author.tag} - Mod-Logs enable`);
            }catch(err){
                if(err == "DiscordRESTError [30007]: Maximum number of webhooks reached (10)") return msg.channel.sendRedEmbed("This channel is at its maximum number of webhooks (10)")
                else return msg.channel.sendRedEmbed('An error occurred while creating the webhook, ' + err)
            }
            
            data.guild.config.modLog.id = webHook.id;
            data.guild.config.modLog.token = webHook.token;
            await this.bot.updateGuildDataCache(data.guild.id, data.guild);
            this.bot.executeWebhook(webHook.id, webHook.token, {
                content: `<@!${msg.author.id}>, Mod-logs have successfully been set-up!`,
                username: this.bot.user.username,
                avatarURL: this.bot.user.staticAvatarURL,
            })

            
        }else if(option == "disable"){
            if(!data.guild.config.modLog.id && !data.guild.config.modLog.token) return msg.reply("Mod-logs are not enabled!");
            try{
                await this.bot.deleteWebhook(data.guild.config.modLog.id, data.guild.config.modLog.token, `${msg.author.id} - Mod-logs disabled`);
            }catch(err){
                if(err != "DiscordRESTError [10015]: Unknown Webhook") return msg.channel.sendRedEmbed('An error occurred while deleting the webhook, ' + err);
            }

            data.guild.config.modLog.id = null;
            data.guild.config.modLog.token = null;
            await this.bot.updateGuildDataCache(data.guild.id, data.guild);
            msg.channel.sendGreenEmbed("Mod-logs have been disabled!");

        }else{
            msg.reply(`**${option}** is not a valid option, Options: \`enable\`, \`disable\``)
        }
        
    }
}
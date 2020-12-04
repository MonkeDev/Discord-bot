const { inspect } = require("util");

const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "kick",
            category: "Moderation",
            description: "Kicks a member from the server",
            usage: "kick <member> [reason]",
            cooldown: 3000,
            mPerms: ["kickMembers"],
            bPerms: ["kickMembers"]
        })
    }

    async run(msg, args, data){
        
        let member = msg.channel.guild.members.get( msg.mentions[0] ? msg.mentions[0].id: args[0] );
        if(!member) return msg.reply("Please provide a valid member by mention or ID.");

        if(member.id == msg.author.id) return msg.reply("You can not kick yourself.");

        let reason = args.slice(1).join(" ") || "None";

        if(!msg.member.highestRole.position > member.highestRole.position) return msg.reply(`You can not kick this member.`)


        if(!member.kickable) return msg.reply("I can not kick this member.");

        let toSendMessage = {
            content: `Case #${data.guild.nextCaseId}, By ${msg.author.tag} in ${msg.channel.guild.name}`,
            embed: {
                title: `${member.tag} kicked`,
                color: this.bot.constants.Colors.red,
                description: `***__Reason__***\n${reason}`,
            }
        }

        await this.bot.getDMChannel(member.id).then(dms => {
            dms.send(toSendMessage);
        }).catch(() => {null})

        await member.kick(`${msg.author.tag} - ${reason}`);

        data.guild.cases.push({
            id: data.guild.nextCaseId,
            userID: member.id,
            reason: reason,
            action: "Kick"
        })
        data.guild.nextCaseId++

        if(data.guild.config.modLog.id && data.guild.config.modLog.token){
            this.bot.executeWebhook(data.guild.config.modLog.id,data.guild.config.modLog.token, {
                username: this.bot.user.username,
                avatarURL: this.bot.user.staticAvatarURL,

                content: toSendMessage.content,
                embeds: [
                    toSendMessage.embed
                ]
            }).catch(() => {
                data.guild.config.modLog.id = null;
                data.guild.config.modLog.token = null;
            })
        }
        
        await this.bot.updateGuildDataCache(data.guild.id, data.guild);

        msg.channel.send(toSendMessage);


    }
}
const { inspect } = require("util");

const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "warn",
            category: "Moderation",
            description: "Warns a member.",
            usage: "warn <user> [reason]",
            cooldown: 3000,
            mPerms: ["manageMessages"]
        })
    }

    async run(msg, args, data){
        let member = msg.mentions[0] || msg.channel.guild.members.get(args[0]);
        if(!member) return msg.reply("Please provide a valid user by mention or ID.");

        if(member.bot) return msg.reply("I can not warn my own kind :(.");

        if(member.id == msg.author.id) return msg.reply("You can not warn yourself.");
        if(msg.channel.memberHasPermission(member.id, "manageMessages")) return msg.reply("This user also has permissions to manageMessages so you can not warn them.");

        let reason = args.slice(1).join(" ") || "None"
        if(reason.length > 170) return msg.reply("The warn reason must be under 170 characters");

        data.guild.cases.push({
            id: data.guild.nextCaseId,
            userID: member.id,
            reason: reason,
            action: "Warn"
        })

        let toSendMessage = {
            content: `Case #${data.guild.nextCaseId}, By ${msg.author.tag} in ${msg.channel.guild.name}`,
            embed: {
                title: `${member.tag} warned`,
                color: this.bot.constants.Colors.red,
                description: `***__Reason__***\n${reason}`,
            }
        }
        msg.channel.send(toSendMessage);
        this.bot.getDMChannel(member.id).then(dms => {
            dms.send(toSendMessage).catch(() => {null})
        })
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


        data.guild.nextCaseId++

        await this.bot.updateGuildDataCache(data.guild.id, data.guild);

    }
}
const { inspect } = require("util");

const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "ban",
            category: "Moderation",
            description: "Bans a member from the server",
            usage: "ban <delete messages in days 1~7> <member>",
            cooldown: 3000,
            mPerms: ["banMembers"],
            bPerms: ["banMembers"]
        })
    }

    async run(msg, args, data){
        
        let member = await msg.channel.guild.members.get( msg.mentions[0] ? msg.mentions[0].id: args[1] );
        if(!member){
            let restUser;
            if(args[1] && !isNaN(args[1])){
                restUser = await this.bot.getRESTUser(args[1]);
            }
            if(!restUser) return msg.reply("Please provide a valid member by mention or ID.");
            member = restUser;
            member.isRestUser = true;
        }


        if(member.id == msg.author.id) return msg.reply("You can not ban yourself.");

        let reason = args.slice(2).join(" ") || "None";


        if(!member.isRestUser && !msg.member.highestRole.position > member.highestRole.position) return msg.reply(`You can not ban this member.`)
        


        if(!member.isRestUser && !member.bannable) return msg.reply("I can not ban this member.");

        let toSendMessage = {
            content: `Case #${data.guild.nextCaseId}, By ${msg.author.tag} in ${msg.channel.guild.name}`,
            embed: {
                title: `${member.tag} banned`,
                color: this.bot.constants.Colors.red,
                description: `***__Reason__***\n${reason}`,
            }
        }

        if(!member.isRestUser){
            await this.bot.getDMChannel(member.id).then(dms => {
                dms.send(toSendMessage);
            }).catch(() => {null})
        }
        if(isNaN(args[0]) || args[0] > 7 || args[0] < 0) args[0] = null;
        if(member.isRestUser){
            msg.channel.guild.banMember(member.id, args[0] || 0, `${msg.author.tag} - ${reason}`);
        }else{
            await member.ban(args[0] || 0, `${msg.author.tag} - ${reason}`);
        }
        

        data.guild.cases.push({
            id: data.guild.nextCaseId,
            userID: member.id,
            reason: reason,
            action: "Ban"
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
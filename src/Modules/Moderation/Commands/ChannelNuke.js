const { inspect } = require("util");

const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "channel-nuke",
            category: "Moderation",
            description: "Deletes all the messages in a channel by cloning it",
            usage: "channel-nuke",
            cooldown: 30000,
            bPerms: ["manageChannels"], 
            mPerms: ["manageChannels"]
        })
    }

    async run(msg, args, data){



        let channel = msg.channel

        let channelOverwrites = []
        await channel.permissionOverwrites.forEach(overRight => {
            channelOverwrites.push(overRight)
        })

        let newChanOptions = {
            parentID: channel.parentID,
            nsfw: channel.nsfw,
            permissionOverwrites: channelOverwrites,
            rateLimitPerUser: channel.rateLimitPerUser,
            reason: "Channel nuke command",
            topic: channel.topic,
        }
        await channel.delete();
        let newChan = await channel.guild.createChannel(channel.name, channel.type, newChanOptions);
        await newChan.editPosition(channel.position);
        newChan.sendGreenEmbed(`Channel nuked successfully by ${msg.member.tag}`);
        
    }
}
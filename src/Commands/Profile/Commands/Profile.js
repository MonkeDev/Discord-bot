const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "profile",
            dms: true,
            category: "Profile",
            description: "See your profile",
            usage: "profile [user]",
            cooldown: 3000
        })
    }

    async run(msg, args, data){

        let embed = {
            author: { 
                name: data.author.profile.name ? data.author.profile.name : msg.member.activeName,
                icon_url: msg.author.avatarURL
            },
            color: data.author.profile.embedColor,
            fields: []
        }

        encodeURI()
        embed.description = data.author.profile.bio || "No bio";
        embed.fields.push({name: '<:Twitter:782841539969155092> Twitter', value: data.author.profile.twitter ? `[${data.author.profile.twitter}](https://twitter.com/${data.author.profile.twitter})` : "Not provided", inline: true});
        embed.fields.push({name: '<:Instagram:782841706147086366> Instagram', value: data.author.profile.insta ? `[${data.author.profile.insta}](https://www.instagram.com/${data.author.profile.insta})` : "Not provided",  inline: true});
        embed.fields.push({name: '<:Twitch:782841857888616491> Twitch', value: data.author.profile.twitch ? `[${data.author.profile.twitch}](https://www.twitch.tv/${data.author.profile.twitch})` : "Not provided",  inline: true});
        embed.fields.push({name: '<:TikTok:782842656354861086> TikTok', value: data.author.profile.tiktok ? `[${data.author.profile.tiktok}](https://www.tiktok.com/@${data.author.profile.tiktok})`: "Not provided", inline: true});
        embed.fields.push({name: '<:YouTube:782842767747448852> YouTube', value: data.author.profile.youtube ? `[${data.author.profile.youtube}](https://www.youtube.com/results?search_query=${encodeURI(data.author.profile.youtube)})`: "Not provided", inline: true});
        embed.fields.push({name: '<:Discord:782843297949286420> dsc.bio', value: data.author.profile.dscbio ? `[${data.author.profile.dscbio}](https://discord.bio/p/${data.author.profile.dscbio})`: "Not provided", inline: true});
        
        embed.fields.push({name: 'Commands used', value: data.author.profile.totalUsedCommands, inline: true});

        msg.channel.send({embed: embed});
    }
}
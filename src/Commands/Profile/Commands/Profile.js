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

        let user = msg.channel.guild.members.get(msg.mentions[0] ? msg.mentions[0].id : null) || msg.channel.guild.members.get(args[0]) || msg.author;
        if(user.id != data.author.id){
            data.author = await this.bot.getUserDataCache(user.id);
        }


        let embed = {
            author: { 
                name: data.author.profile.name ? data.author.profile.name : user.tag,
                icon_url: user.avatarURL
            },
            color: data.author.profile.embedColor,
            fields: [],
            footer: {
                text: `id: ${user.id}`
            }
        }

        embed.description = data.author.profile.bio || "No bio";
        embed.fields.push({name: '<:Twitter:782841539969155092> Twitter', value: data.author.profile.twitter ? `[${data.author.profile.twitter}](https://twitter.com/${data.author.profile.twitter})` : "Not provided", inline: true});
        embed.fields.push({name: '<:Instagram:782841706147086366> Instagram', value: data.author.profile.insta ? `[${data.author.profile.insta}](https://www.instagram.com/${data.author.profile.insta})` : "Not provided",  inline: true});
        embed.fields.push({name: '<:Twitch:782841857888616491> Twitch', value: data.author.profile.twitch ? `[${data.author.profile.twitch}](https://www.twitch.tv/${data.author.profile.twitch})` : "Not provided",  inline: true});
        embed.fields.push({name: '<:GitHub:780225146656915507> GitHub', value: data.author.profile.github ? `[${data.author.profile.github}](https://www.github.com/${data.author.profile.github})`: "Not provided", inline: true});
        embed.fields.push({name: '<:YouTube:782842767747448852> YouTube', value: data.author.profile.youtube ? `[${data.author.profile.youtube}](https://www.youtube.com/results?search_query=${encodeURI(data.author.profile.youtube)})`: "Not provided", inline: true});
        embed.fields.push({name: '<:Discord:782843297949286420> dsc.bio', value: data.author.profile.dscbio ? `[${data.author.profile.dscbio}](https://discord.bio/p/${data.author.profile.dscbio})`: "Not provided", inline: true});
        
        embed.fields.push({name: '⏫ Multi', value: data.author.economy.money.multi.toString(), inline: true});
        embed.fields.push({name: "💰 Wallet", value: data.author.economy.money.wallet.toString(), inline: true});
        embed.fields.push({name: '🏦 Bank', value: data.author.economy.money.inBank.toString(), inline: true});

        msg.channel.send({embed: embed});
    }
}
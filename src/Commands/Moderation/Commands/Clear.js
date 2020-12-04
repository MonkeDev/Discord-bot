const { inspect } = require("util");

const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "clear",
            category: "Moderation",
            description: "Mass deletes messages in a channel, No pinned messages will be deleted.\n\u3000__Filters__\n\u3000\u3000member <member>\u3000!member <member>\n\u3000\u3000bots\n\u3000\u3000attachments\n\u3000\u3000mentions\n\u3000\u3000embeds",
            usage: "clear <limit> [filter]",
            cooldown: 5000,
            bPerms: ["manageMessages"], 
            mPerms: ["manageMessages"]
        })
    }

    async run(msg, args, data){
        //purge(limit, filter, before, after, reason)

        /* I Know i can make this shorter lol */

        let amout = args[0];
        if(!amout) return msg.reply("Please provide a amout.");

        amout = Math.floor(Number(amout));
        if(!amout) return msg.reply("Your amout must be a number.");

        if(amout > 200) amout = 200;
        if(amout  < 2) amout = 2;

        let filter = args[1];

        if(filter){
            filter = filter.toLowerCase();
            if(filter == "member"){

                let member = msg.mentions[0] || msg.channel.guild.members.get(args[2]);
                if(!member) return msg.reply("Please give a member by mention or ID.");
                let clearMessage = await msg.channel.send("<a:Loading:783663632596467732> Clearing message(s)");

                let clearAmout = await msg.channel.purge(amout, x => x.id != clearMessage.id && !x.pinned && x.author.id == member.id, null, null, `${msg.author.tag} - clear command`);
                clearMessage.edit(`Cleared ${clearAmout} messages!`);
                clearMessage.delete(null, 5000);
                
            }else if(filter == "bots"){

                let clearMessage = await msg.channel.send("<a:Loading:783663632596467732> Clearing message(s)");
                let clearAmout = await msg.channel.purge(amout, x => x.id != clearMessage.id && !x.pinned && x.author.bot, null, null, `${msg.author.tag} - clear command`);
                clearMessage.edit(`Cleared ${clearAmout} messages!`);
                clearMessage.delete(null, 5000);

            }else if(filter == "attachments"){

                let clearMessage = await msg.channel.send("<a:Loading:783663632596467732> Clearing message(s)");
                let clearAmout = await msg.channel.purge(amout, x => x.id != clearMessage.id && !x.pinned && x.attachments[0], null, null, `${msg.author.tag} - clear command`);
                clearMessage.edit(`Cleared ${clearAmout} messages!`);
                clearMessage.delete(null, 5000);

            }else if(filter == "mentions"){

                let clearMessage = await msg.channel.send("<a:Loading:783663632596467732> Clearing message(s)");
                let clearAmout = await msg.channel.purge(amout, x => x.id != clearMessage.id && !x.pinned && x.mentions[0] || x.id != clearMessage.id && !x.pinned && x.mentionEveryone || x.id != clearMessage.id && !x.pinned && x.roleMentions[0], null, null, `${msg.author.tag} - clear command`);
                clearMessage.edit(`Cleared ${clearAmout} messages!`);
                clearMessage.delete(null, 5000);
                
            }else if(filter == "embeds"){

                let clearMessage = await msg.channel.send("<a:Loading:783663632596467732> Clearing message(s)");
                let clearAmout = await msg.channel.purge(amout, x => x.id != clearMessage.id && !x.pinned && x.embeds[0], null, null, `${msg.author.tag} - clear command`);
                clearMessage.edit(`Cleared ${clearAmout} messages!`);
                clearMessage.delete(null, 5000);

            }else if(filter == "!member"){

                let member = msg.mentions[0] || msg.channel.guild.members.get(args[2]);
                if(!member) return msg.reply("Please give a member by mention or ID.");
                let clearMessage = await msg.channel.send("<a:Loading:783663632596467732> Clearing message(s)");

                let clearAmout = await msg.channel.purge(amout, x => x.id != clearMessage.id && !x.pinned && x.author.id != member.id, null, null, `${msg.author.tag} - clear command`);
                clearMessage.edit(`Cleared ${clearAmout} messages!`);
                clearMessage.delete(null, 5000);

            }else{
                return msg.reply(`**${filter}** is not a valid filter.`);
            }
        }else{

            let clearMessage = await msg.channel.send("<a:Loading:783663632596467732> Clearing message(s)");
            let clearAmout = await msg.channel.purge(amout, x => x.id != clearMessage.id && !x.pinned, null, null, `${msg.author.tag} - clear command`);
            clearMessage.edit(`Cleared ${clearAmout} messages!`);
            clearMessage.delete(null, 5000);

        }

    }
}
const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-twitter",
            alli: ["settwitter"],
            dms: true,
            category: "Profile",
            description: "Change the twitter username that will be shown on your profile",
            usage: "set-twitter <new-twitter>",
            cooldown: 5000
        })
    }

    async run(msg, args, data){
        
        let newTwitter = args[0];
        if(!newTwitter && data.author.profile.twitter){
            data.author.profile.twitter = null;
            return msg.reply("Your twitter username has been removed");
        } 
        if(!newTwitter && !data.author.profile.twitter) return msg.reply("A new twitter username is required"); 
        if(newTwitter.length > 15) return msg.reply("Your twitter username must be under 15 characters")
        data.author.profile.twitter = newTwitter;
        msg.reply(`Your profile bio is now **${newTwitter}**, Do not forget to save your data!`);
    }
}
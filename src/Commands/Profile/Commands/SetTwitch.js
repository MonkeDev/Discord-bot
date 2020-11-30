const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-twitch",
            alli: ["settwitch"],
            dms: true,
            category: "Profile",
            description: "Change the twitch username that will be shown on your profile",
            usage: "set-twitch <new-twitch>",
            cooldown: 5000
        })
    }

    async run(msg, args, data){
        
        let newTwitch = args[0];
        if(!newTwitch && data.author.profile.twitch){
            data.author.profile.twitch = null;
            return msg.reply("Your twitch username has been removed");
        } 
        if(!newTwitch && !data.author.profile.twitch) return msg.reply("A new twitch username is required"); 
        if(newTwitch.length > 30) return msg.reply("Your twitch username must be under 30 characters");
        data.author.profile.twitch = newTwitch;
        msg.reply(`Your profile twitch username is now **${newTwitch}**, Do not forget to save your data!`);
    }
}
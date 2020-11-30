const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-tiktok",
            alli: ["settiktok"],
            dms: true,
            category: "Profile",
            description: "Change the tiktok username that will be shown on your profile",
            usage: "set-twitch <new-twitch>",
            cooldown: 5000
        })
    }

    async run(msg, args, data){
        
        let newTiktok = args[0];
        if(!newTiktok && data.author.profile.tiktok){
            data.author.profile.tiktok = null;
            return msg.reply("Your tiktok username has been removed");
        } 
        if(!newTiktok && !data.author.profile.tiktok) return msg.reply("A new tiktok username is required"); 
        if(newTiktok.length > 30) return msg.reply("Your tiktok username must be under 30 characters");
        data.author.profile.tiktok = newTiktok;
        msg.reply(`Your profile tiktok username is now **${newTiktok}**, Do not forget to save your data!`);
    }
}
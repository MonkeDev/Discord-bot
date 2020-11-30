const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-instagram",
            alli: ["setinstagram"],
            dms: true,
            category: "Profile",
            description: "Change the instagram username that will be shown on your profile",
            usage: "set-instagram <new-instagram>",
            cooldown: 5000
        })
    }

    async run(msg, args, data){
        
        let newInstagram = args[0];
        if(!newInstagram && data.author.profile.insta){
            data.author.profile.insta = null;
            return msg.reply("Your instagram username has been removed");
        } 
        if(!newInstagram && !data.author.profile.insta) return msg.reply("A new instagram username is required"); 
        if(newInstagram.length > 30) return msg.reply("Your instagram username must be under 30 characters");
        data.author.profile.insta = newInstagram;
        msg.reply(`Your profile instagram username is now **${newInstagram}**, Do not forget to save your data!`);
    }
}
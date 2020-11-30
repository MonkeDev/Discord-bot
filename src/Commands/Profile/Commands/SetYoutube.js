const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-youtube",
            alli: ["setyoutube"],
            dms: true,
            category: "Profile",
            description: "Change the youtube username that will be shown on your profile",
            usage: "set-youtube <new-youtube>",
            cooldown: 5000
        })
    }

    async run(msg, args, data){
        
        let newYoutube = args.join(" ");
        if(!newYoutube && data.author.profile.youtube){
            data.author.profile.youtube = null;
            return msg.reply("Your youtube username has been removed");
        } 
        if(!newYoutube && !data.author.profile.youtube) return msg.reply("A new youtube username is required"); 
        if(newYoutube.length > 30) return msg.reply("Your youtube username must be under 30 characters");
        data.author.profile.youtube = newYoutube;
        msg.reply(`Your profile youtube username is now **${newYoutube}**, Do not forget to save your data!`);
    }
}
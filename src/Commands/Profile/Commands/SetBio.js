const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-bio",
            alli: ["setbio"],
            dms: true,
            category: "Profile",
            description: "Change the bio that will be shown on your profile",
            usage: "set-bio <new-bio>",
            cooldown: 5000
        })
    }

    async run(msg, args, data){
        
        let newBio = args.join(" ");
        if(!newBio && data.author.profile.bio){
            data.author.profile.bio = null;
            return msg.reply("Your bio has been removed");
        } 
        if(!newBio && !data.author.profile.bio) return msg.reply("A new bio is required"); 
        if(newBio.length > 250) return msg.reply("Your bio must be under 250 characters")
        data.author.profile.bio = newBio;
        msg.reply(`Your profile bio is now **${newBio}**, Do not forget to save your data!`);
    }
}
const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-name",
            alli: ["setname"],
            dms: true,
            category: "Profile",
            description: "Change the name shown on your profile",
            usage: "set-name <new-name>",
            cooldown: 15000
        })
    }

    async run(msg, args, data){
        let newName = args.join(" ");
        if(!newName && data.author.profile.name){
            data.author.profile.insta = null;
            return msg.reply("Your name has been removed");
        }
        if(!newName && !data.author.profile.name) return msg.reply("You must provide a new name");
        if(newName.length > 60) return msg.reply("Your new name must be under 60 characters");
        data.author.profile.name = newName;
        return msg.reply(`Your name will now be shown as **${data.author.profile.name}** on your profile, Do not forget to save your data!`)
    }
}
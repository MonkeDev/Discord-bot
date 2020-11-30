const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-dscbio",
            alli: ["setdscbio"],
            dms: true,
            category: "Profile",
            description: "Change the dscbio username that will be shown on your profile",
            usage: "set-dscbio <new-dscbio>",
            cooldown: 5000
        })
    }

    async run(msg, args, data){
        
        let newDscbio = args[0];
        if(!newDscbio && data.author.profile.dscbio){
            data.author.profile.dscbio = null;
            return msg.reply("Your dscbio username has been removed");
        } 
        if(!newDscbio && !data.author.profile.dscbio) return msg.reply("A new dscbio username is required"); 
        if(newDscbio.length > 30) return msg.reply("Your dscbio username must be under 30 characters");
        data.author.profile.dscbio = newDscbio;
        msg.reply(`Your profile dscbio username is now **${newDscbio}**, Do not forget to save your data!`);
    }
}
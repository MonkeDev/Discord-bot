const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-github",
            alli: ["setgithub"],
            dms: true,
            category: "Profile",
            description: "Change the github username that will be shown on your profile",
            usage: "set-github <new-github>",
            cooldown: 5000
        })
    }

    async run(msg, args, data){
        
        let newGithub = args[0];
        if(!newGithub && data.author.profile.github){
            data.author.profile.github = null;
            return msg.reply("Your github username has been removed");
        } 
        if(!newGithub && !data.author.profile.github) return msg.reply("A new github username is required"); 
        if(newGithub.length > 30) return msg.reply("Your github username must be under 30 characters");
        data.author.profile.github = newGithub;
        msg.reply(`Your profile github username is now **${newGithub}**, Do not forget to save your data!`);
    }
}
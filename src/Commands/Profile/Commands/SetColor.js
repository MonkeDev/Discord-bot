const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "set-color",
            alli: ["setcolor"],
            dms: true,
            category: "Profile",
            description: "Change the color shown on your profile",
            usage: "set-color <new-color>",
            cooldown: 5000
        })
    }

    async run(msg, args, data){
        
        let newColor = args[0];
        if(!newColor) return msg.reply("A new color is required");

        let colors = this.bot.constants.Colors;
        if(!Object.keys(colors).includes(newColor)) return msg.reply(`${newColor}, Is now a options. Options: \`${Object.keys(colors).join("`, `")}\``)
        data.author.profile.embedColor = Object.getOwnPropertyDescriptor(colors, newColor).value;
        msg.reply(`Your profile color is now **${newColor}**, Do not forget to save your data!`);
    }
}
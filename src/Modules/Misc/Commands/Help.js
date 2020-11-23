const baseCmd = require("../../../Structors/Command");
module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "help",
            dms: true,
            category: "Misc",
            helpEmbed: {
                title: 'Help',
                description: ''
            }
        })
    }

    async run(msg, args){
        
        
        
        if(!args[0]){

            let embed = {
                title: 'Help menu',
                color: this.bot.constants.Colors.main,
                fields: []
            }   

            let categorys = [];

            await this.bot.cmdsAndAlli.forEach(async set => {
                if(!categorys.includes(set.category)){
                    categorys.push(set.category)
                }
            })
            await categorys.forEach(c => {
                let cmdsWithC = []
                this.bot.cmdsAndAlli.forEach(cmd => {
                    if(cmd.category == c){
                        cmdsWithC.push(cmd.name)
                    }
                })
                embed.fields.push({name: c, value: `\`${cmdsWithC.join("`, `")}\``})
            })

            msg.channel.send({embed: embed})
        }else{
            let cmd = await this.bot.cmdsAndAlli.get(args[0].toLowerCase());
            if(!cmd) return msg.channel.sendRedEmbed(`__**${args[0]}**__ is not a command`);
            msg.channel.send({embed: cmd.helpEmbed})
        }

        
    }
}
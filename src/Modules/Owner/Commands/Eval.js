const { inspect } = require("util");

const baseCmd = require("../../../Structors/Command");

module.exports = class Help extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "eval",
            dms: true,
            category: "Owner",
            description: "Evals some code",
            usage: "eval <code>",
            cooldown: 1
        })
    }

    async run(msg, args, data){





        let input = args.join(" "),
        hasAwait = input.includes("await"),
        evaled,
        startTime = Date.now();
        if(!input) return msg.reply({
            content: "Give me input bruh",
        })

        try{
            evaled = await hasAwait ? eval(`(async () => { ${input} })()`) : eval(input);
            if(typeof evaled != "string"){
                evaled = inspect(evaled, {
                    depth: +!(inspect(evaled, { depth: 1 }))
                });
            }
        }catch(err){
            evaled = err;
        }

        evaled = evaled.toString();

        if(!evaled) return msg.channel.sendRedEmbed("Nothing returned")

        msg.channel.send(`${Date.now() - startTime} ms\`\`\`js\n${evaled.replace(this.bot.token, "botToken")}\`\`\``);
         
        
    }
}
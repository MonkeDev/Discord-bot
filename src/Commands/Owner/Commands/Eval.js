const { inspect } = require("util");
const fetch = require("node-fetch")
const ms = require("ms");
const os = require("os");
const users = require("../../../Database/Schemas/Users");
const guilds = require("../../../Database/Schemas/Guild");


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
        hasReturn = input.includes("return"),
        evaled,
        startTime = Date.now()
        if(!input) return msg.reply({
            content: "Give me input bruh",
        })

        try{
            evaled = hasAwait ? await eval(`(async () => { ${hasReturn ? " " : "return"} ${input} })()`) : eval(input);
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

        if(evaled.length > 1800){
            const options = {
                method: "POST",
                body: `${input}\n\n\n${evaled}`,
                headers: {
                    "Content-Type": "text/plain"
                }
            }
             
            let fetched = await fetch('https://hasteb.in/documents', options)
            fetched = await fetched.json();
            return msg.reply(`https://hasteb.in/${fetched.key}.js`)
        }else return msg.channel.send(`${Date.now() - startTime} ms\`\`\`js\n${evaled.replace(this.bot.token, "botToken").split(os.userInfo().username).join("userLogin")}\`\`\``);
        
         
        
    }
}
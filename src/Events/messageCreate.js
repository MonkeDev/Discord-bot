module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(msg){

        

        let prefix = this.bot.constants.Config.defaultPrefix;
        if(msg.author.bot || !msg.content.startsWith(prefix)) return;

        let args = msg.content.split(/ +/);
        let cmd = args[0].toLowerCase().slice(prefix.length);

        cmd = await this.bot.cmdsAndAlli.get(cmd);
        if(!cmd) return;


        cmd.run(msg, args)
    };
}
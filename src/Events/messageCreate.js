const data = {};


const handleCooldown = async (id, map) => {

}

module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(msg){
        if(!msg.channel.guild || msg.author.bot) return;

        data.prefix = await this.bot.getPrefixCache(msg.channel.guild.id);
        if(!msg.content.startsWith(data.prefix)) return;

        let args = msg.content.split(/ +/)
        let cmd = args[0].toLowerCase().slice(data.prefix.length);
        args = args.slice(1);

        cmd = await this.bot.cmdsAndAlli.get(cmd);
        if(!cmd) return;

        if(!msg.channel.memberHasPermission(this.bot.user.id, this.bot.constants.Eris.perms.embedLinks)){
            let dmChannel = await msg.member.user.getDMChannel();
            return dmChannel.sendRedEmbed(`I do **__not__** have embedLinks permission in the channel <#${msg.channel.id}>, So you can **__NOT__** use me in that channel`);
        }
        
        


        cmd.run(msg, args, data)
    };
}
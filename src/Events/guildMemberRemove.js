const data = {};
module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(guild, member){
        data.guild = await this.bot.getGuildDataCache(guild.id);
        if(data.guild.config.leaveMsg.id && data.guild.config.leaveMsg.token){

            this.bot.executeWebhook(data.guild.config.leaveMsg.id, data.guild.config.leaveMsg.token, {
                content: await this.bot.structorMessage(guild, member, data.guild.config.leaveMsg.msg),
                allowedMentions: {
                    everyone: false,
                    roles: false,
                    users: true
                },
                username: this.bot.user.username,
                avatarURL: this.bot.user.staticAvatarURL,
            }).catch(() => {
                data.guild.config.leaveMsg = {
                    id: null,
                    token: null,
                    msg: null
                }
                
                this.bot.updateGuildDataCache(guild.id, data.guild);
            })

        }
    }   
}
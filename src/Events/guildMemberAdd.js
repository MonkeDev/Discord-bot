const data = {};
module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(guild, member){
        data.guild = await this.bot.getGuildDataCache(guild.id);
        if(data.guild.config.welcomeMsg.id && data.guild.config.welcomeMsg.token){

            this.bot.executeWebhook(data.guild.config.welcomeMsg.id, data.guild.config.welcomeMsg.token, {
                content: await this.bot.structorMessage(guild, member, data.guild.config.welcomeMsg.msg),
                allowedMentions: {
                    everyone: false,
                    roles: false,
                    users: true
                },
                username: this.bot.user.username,
                avatarURL: this.bot.user.staticAvatarURL,
            }).catch(async () => {
                data.guild.config.welcomeMsg = {
                    id: null,
                    token: null,
                    msg: null
                }
                
                await this.bot.updateGuildDataCache(guild.id, data.guild);
            })

        }
    }   
}
module.exports = class{
    constructor(bot, hookToken, hookID){
        this.bot = bot;
        this.hookToken = hookToken;
        this.hookID = hookID;
    }

    hookLog(log, content){
        this.bot.executeWebhook(this.hookID, this.hookToken, {
            allowedMentions: {everyone: true},
            content: content,
            embeds: [
                {
                    color: this.bot.constants.Colors.main,
                    description: log
                }
            ]
        })
    }

}
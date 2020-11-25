module.exports = class{
    constructor(bot, hookToken, hookID){
        this.bot = bot;
        this.hookToken = hookToken;
        this.hookID = hookID;


    }

    hookLog(log, content, username, ava){
        this.bot.executeWebhook(this.hookID, this.hookToken, {
            username: username,
            avatarURL: ava || null,
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
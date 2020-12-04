const extendedmap = require('extendedmap');
module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(){
        console.log(`${this.bot.user.tag} is ready`);

        setInterval(() => {
            if(this.bot.cache.guilds.size > 1000){
                this.bot.cache.guilds = new extendedmap();
            }
            if(this.bot.cache.users.size > 10000){
                this.bot.cache.users = new extendedmap();
            }
        }, 999999);
        // 16m 39.9s
    };
}
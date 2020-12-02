module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(){
        setTimeout(() => {
            if(this.bot.ready != true) this.bot.connect();
        }, 10000);
    };
}
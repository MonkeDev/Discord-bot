module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(){
        console.log(`${this.bot.user.tag} is ready`);
    };
}
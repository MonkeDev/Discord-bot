module.exports = class{
    constructor(bot){
        this.bot = bot;

        this.name = "help";
        this.alli = [];

        this.dms = true;

        this.helpEmbed = {
            title: 'Help command'
        }
    }

    async run(msg){
        msg.channel.send("hello")
    }

}
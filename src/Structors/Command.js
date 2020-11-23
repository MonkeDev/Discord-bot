module.exports = class {
    constructor(bot, cmd){
        this.bot = bot;

        this.name = cmd.name || "none";
        this.alli = cmd.alli || [];

        this.bPerms = cmd.bPerms || [];
        this.mPerms = cmd.mPerms || [];

        this.dms = cmd.dms || false;

        this.helpEmbed = cmd.helpEmbed || { title: `No help embed given`, color: this.bot.constants.Colors.red }

    }
}
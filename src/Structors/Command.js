module.exports = class {
    constructor(bot, cmd){
        this.bot = bot;

        this.name = cmd.name || "none";
        this.alli = cmd.alli || [];
        this.category = cmd.category || "Other";

        this.bPerms = cmd.bPerms || [];
        this.mPerms = cmd.mPerms || [];

        this.dms = cmd.dms || false;

        this.cooldown = cmd.cooldown || 1500

        this.helpEmbed = cmd.helpEmbed || { title: `No help embed given`, color: this.bot.constants.Colors.red }

    }
}
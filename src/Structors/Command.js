module.exports = class {
    /**
     * 
     * @param {} bot 
     * @param {} cmd 
     * @param {*} cmd.description
     * @param {*} cmd.usage
     * @param {*} cmd.bPerms
     * @param {*} cmd.mPerms
     * @param {*} cmd.category
     * @param {*} cmd.cooldown
     * @param {*} cmd.alli
     */
    constructor(bot, cmd){
        this.bot = bot;

        this.name = cmd.name || "none";
        this.alli = cmd.alli || [];
        this.category = cmd.category || "Other";
        this.description = cmd.description || "None";
        this.usage = cmd.usage || "None"
        this.addPrefix = cmd.addPrefix || true;

        this.bPerms = cmd.bPerms || [];
        this.mPerms = cmd.mPerms || [];


        this.cooldown = cmd.cooldown || 1500

        this.helpEmbed = cmd.helpEmbed || { title: `No help embed`, color: this.bot.constants.Colors.red }

    }
}
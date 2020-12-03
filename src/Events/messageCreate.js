const data = {};
const prettyMs = require("pretty-ms");

const handleCooldown = async (id, map, cmd) => {
    let cooldown = await map.get(`${id}_${cmd.name}`);
    if(cooldown) return prettyMs(cmd.cooldown - (Date.now() - cooldown));
    else{
        map.set(`${id}_${cmd.name}`, Date.now());
        setTimeout(() => {
            map.delete(`${id}_${cmd.name}`);
        }, cmd.cooldown);
    }
}

const checkHardCooldown = async (id, map) => {
    let hardcooldown = await map.get(id);
    if(hardcooldown) return hardcooldown;
    else{
        map.set(id, " ");
        setTimeout(() => {
            map.delete(id);
        }, 600);
    }
}

module.exports = class{
    constructor(bot){
        this.bot = bot;
    }

    async run(msg){

        if(!msg.channel.guild || msg.author.bot) return;

        data.guild = await this.bot.getGuildDataCache(msg.channel.guild.id);
        data.author = await this.bot.getUserDataCache(msg.author.id);

        data.author.economy.money.wallet = Math.floor(data.author.economy.money.wallet + (Math.random() * 15) * data.author.economy.money.multi)
        if((Math.floor(Math.random() * 700)) < 2){
            data.author.economy.money.multi = (data.author.economy.money.multi += .3).toFixed(2);
            msg.channel.send(`<@!${msg.author.id}>, Congratulations you multi as gone up by .3 your new multi is ${data.author.economy.money.multi}!`);
        }

        let prefix = data.guild.config.prefix;

        if(msg.content == `<@!${this.bot.user.id}>`) return msg.channel.send(`My prefix for **${msg.channel.guild.name}** is **${prefix}**, For more info --> \`${prefix}help\``)

        if(!msg.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

        let args = msg.content.split(/ +/)
    
        let cmd = await this.bot.cmdsAndAlli.get(args[0].toLowerCase().slice(prefix.length));
        if(!cmd) {
            if(args[1]) cmd = await this.bot.cmdsAndAlli.get(args[1].toLowerCase());
            if(cmd) args = args.slice(2);
        }else args = args.slice(1);

        if(!cmd) return;

        if(cmd.category == "Owner" && !this.bot.constants.Config.owners.includes(msg.author.id)) return msg.reply("This is a owner **ONLY** command");

        let checkedHardCooldown = await checkHardCooldown(msg.channel.id, this.bot.hardCooldown);
        if(checkedHardCooldown) return;

        if(!msg.channel.memberHasPermission(this.bot.user.id, this.bot.constants.Eris.perms.embedLinks)){
            let dmChannel = await msg.member.user.getDMChannel();
            return dmChannel.sendRedEmbed(`I do **__not__** have embedLinks permission in the channel <#${msg.channel.id}>, So you can **__NOT__** use me in that channel`).catch(err => {null});
        }


        let handledCooldown = await handleCooldown(msg.author.id, this.bot.cooldowns, cmd);
        if(handledCooldown) return msg.channel.sendRedEmbed(`You are still in cooldown time left: ${handledCooldown}`);


        let neededMPerms = [];
        cmd.mPerms.forEach(perm => {
            if(!msg.channel.memberHasPermission(msg.author.id, perm)) neededMPerms.push(perm);
        })
        if(neededMPerms.length != 0) return msg.channel.sendRedEmbed(`You are **missing** permission(s) to use this comamnd,\nNeeded permission(s): \`${neededMPerms.join("`, `")}\``);

        let neededBPerms = [];
        cmd.bPerms.forEach(perm => {
            if(!msg.channel.memberHasPermission(this.bot.user.id, perm)) neededBPerms.push(perm);
        })
        if(neededBPerms.length != 0) return msg.channel.sendRedEmbed(`I am **missing** permission(s) to use this comamnd,\nNeeded permission(s): \`${neededBPerms.join("`, `")}\``);


        
        cmd.run(msg, args, data);
        data.author.stats.UsedCommands++;
    };
}
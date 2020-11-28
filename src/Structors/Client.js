const eris = require("eris");
const mongoHelper = require("../Database/Helper");
const mongo = require('mongoose');
const guilds = require("../Database/Schemas/Guild");
const prettyMs = require("pretty-ms");

module.exports = class Client extends eris.Client{
    constructor(token, options, mongoUrl, mongoOptions){
        super(token, options);



        this.cmdsAndAlli = new Map();

        this.mongoHelper = new mongoHelper(mongoUrl, mongoOptions);

        this.cache = {
            guild: new Map()
        }

        this.cooldowns = new Map();
        this.hardCooldown = new Map();


        this.logger = new (require("./Helpers/Logger"))(this, process.env.hookToken, process.env.hookID);

        
    }

    get constants(){
        return {
            Eris: require("../Constants/Eris"),
            Config: require("../Constants/Config"),
            Colors: require("../Constants/Colors")
        };
    }

    loadAddOn(addOnDir){
        let file = require(addOnDir);
        file(eris);
    }

    loadCmd(cmdPath){
        const file = new (require(cmdPath))(this);
        this.cmdsAndAlli.set(file.name, file);
        file.alli.forEach(alli => {
            this.cmdsAndAlli.set(alli, file);
        });
    };

    loadEvent(eventPath, eventName, once){
        const file = new (require(eventPath))(this);
        if(once == true) this.once(eventName, (...args) => file.run(...args));
        else this.on(eventName, (...args) => file.run(...args));
    }

    async connectMongo(){
        return await this.mongoHelper.connect();
    }

    loadMongoEvent(eventDir, eventName){
        let file = new (require(eventDir))(this);
        mongo.connection.on(eventName, (...args) => file.run(...args))
    }

    async getGuildData(id){
        let data = await guilds.findOne({id: id});
        if(!data) data = await new guilds({id: id}).save();
        return data;
    }

    async getGuildDataCache(id){
        let guildData = await this.cache.guild.get(id);
        if(!guildData){
            await this.updateGuildDataCache(id);
            guildData = await this.cache.guild.get(id);
        }
        return guildData;
    }

    async updateGuildDataCache(id, newData){
        let data = await this.getGuildData(id);
        if(newData){
            data = newData;
            await data.save();
        }
        this.cache.guild.set(id, data);
    }

    getRandomArrayElement(array){
        return array[Math.floor(Math.random() * array.length)];
    }

    makeHelpEmbed(cmd, prefix){
        if(cmd.addPrefix != true) prefix = "";
        return {
            title: `${cmd.name}, ${cmd.category}`,
            color: this.constants.Colors.main,
            description: `__**Aliases**__\n\u3000${cmd.alli.join(", ") || "None"}\n__**Description**__\n\u3000${cmd.description}\n__**Usage**__\n\u3000${prefix}${cmd.usage}\n__**Cooldown**__\n\u3000${prettyMs(cmd.cooldown)}\n__**Permission(s) needed**__\n\u3000${cmd.mPerms.join(", ") || "None"}`
        }
    }

    async structorMessage(guild, member, welcomeMessage){
        let returns = [
            {
                in: "{member.username}",
                out: member.username
            },
            {
                in: "{member.mention}",
                out: `<@!${member.id}>`
            },
            {
                in: "{member.tag}",
                out: `${member.username}#${member.discriminator}`
            },
            {
                in: "{guild.name}",
                out: guild.name
            },
            {
                in: "{guild.memberCount}",
                out: guild.memberCount
            }
        ]
        returns.forEach(r => {
            welcomeMessage = welcomeMessage.replace(r.in, r.out);
        })
        return welcomeMessage;
    }


} 

require("../envSet")();

const fs = require("fs");
const Client = require("./Structors/Client");

const bot = new Client(process.env.botToken, {
    allowedMentions: {
        roles: false,
        users: true,
        everyone: false
    },
    defaultImageFormat: "png",
    defaultImageSize: 512,
    intents: [
        "guilds",
        "guildMembers",
        "guildMessages"
    ],
    getAllUsers: true,
    restMode: true

}, process.env.mongoInfo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
});

const init = async () => {
    const CommandFolders = fs.readdirSync(__dirname + "/Commands");
    CommandFolders.forEach(async Module => {
        let cmdFiles = fs.readdirSync(__dirname + "/Commands/" + Module + "/Commands");
        cmdFiles = cmdFiles.filter(x => x.endsWith(".js"));
        cmdFiles.forEach(cmd => {
            bot.loadCmd(__dirname + "/Commands/" + Module + "/Commands/" + cmd);
        });
    });

    let events = fs.readdirSync(__dirname + "/Events");
    events = events.filter(x => x.endsWith(".js"));
    events.forEach(event => {
        let once = false
        if(bot.constants.Config.onceFiles.includes(event)) once = true;
        bot.loadEvent(__dirname + "/Events/" + event, event.slice(0, event.length - 3), once);
    })

    let addOns = fs.readdirSync(__dirname + "/erisAddOns");
    addOns.forEach(addOn => {
        bot.loadAddOn(__dirname + "/erisAddOns/" + addOn)
    })

    let mongoEvents = fs.readdirSync(__dirname + "/Database/Events");
    mongoEvents.forEach(event => {
        bot.loadMongoEvent(__dirname + "/Database/Events/" + event, event.slice(0, event.length - 3));
    })

    bot.connectMongo();

    console.log("Init function has ran");
    
};

console.clear();
init();


process.on('unhandledRejection', err => { bot.logger.hookLog(`${err}`, "@here unhandledRejection", "unhandledRejection", "https://i.imgur.com/M2CEEPp.jpg"); });
process.on("uncaughtException", err => { bot.logger.hookLog(`${err}`, "@here uncaughtException", "uncaughtException", "https://i.imgur.com/M2CEEPp.jpg"); });
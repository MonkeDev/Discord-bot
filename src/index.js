require("dotenv").config();
const fs = require("fs");
const Client = require("./Structors/Client");

const bot = new Client(process.env.botToken, {
    allowedMentions: {
        roles: false,
        users: false,
        everyone: false
    },
    defaultImageFormat: "png",
    defaultImageSize: 512
}, process.env.mongoInfo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
});

const init = async () => {
    const Modules = fs.readdirSync(__dirname + "/Modules");
    Modules.forEach(async Module => {
        let cmdFiles = await fs.readdirSync(__dirname + "/Modules/" + Module + "/Commands");
        cmdFiles = cmdFiles.filter(x => x.endsWith(".js"));
        cmdFiles.forEach(cmd => {
            bot.loadCmd(__dirname + "/Modules/" + Module + "/Commands/" + cmd);
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
    
};
init();

bot.connect();
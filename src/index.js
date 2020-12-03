/*
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
    getAllUsers: true

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


process.on('unhandledRejection', err => {
    bot.logger.hookLog(`${err}`, "@here unhandledRejection", "unhandledRejection", "https://i.imgur.com/M2CEEPp.jpg");
});
process.on("uncaughtException", err => {
    bot.logger.hookLog(`${err}`, "@here uncaughtException", "uncaughtException", "https://i.imgur.com/M2CEEPp.jpg");
})
*/
const _0xb4f1=['/Events/','unhandledRejection','readdirSync','@here\x20unhandledRejection','length','uncaughtException','/Database/Events/','/erisAddOns','env','loadEvent','Config','guildMessages','https://i.imgur.com/M2CEEPp.jpg','connectMongo','filter','hookLog','constants','Init\x20function\x20has\x20ran','/Database/Events','/Commands/','forEach','./Structors/Client','../envSet','includes','logger','slice','guildMembers','onceFiles','/Commands','png','botToken','/erisAddOns/','loadAddOn','@here\x20uncaughtException'];(function(_0x23a34b,_0xcbf2af){const _0xb4f165=function(_0x3ce901){while(--_0x3ce901){_0x23a34b['push'](_0x23a34b['shift']());}};_0xb4f165(++_0xcbf2af);}(_0xb4f1,0x70));const _0x3ce9=function(_0x23a34b,_0xcbf2af){_0x23a34b=_0x23a34b-0xd5;let _0xb4f165=_0xb4f1[_0x23a34b];return _0xb4f165;};const _0x5484e7=_0x3ce9;require(_0x5484e7(0xe1))();const fs=require('fs'),Client=require(_0x5484e7(0xe0)),bot=new Client(process['env'][_0x5484e7(0xe9)],{'allowedMentions':{'roles':![],'users':!![],'everyone':![]},'defaultImageFormat':_0x5484e7(0xe8),'defaultImageSize':0x200,'intents':['guilds',_0x5484e7(0xe5),_0x5484e7(0xd6)],'getAllUsers':!![]},process[_0x5484e7(0xf5)]['mongoInfo'],{'useNewUrlParser':!![],'useUnifiedTopology':!![],'autoIndex':!![]}),init=async()=>{const _0x82d395=_0x5484e7,_0x4f3702=fs['readdirSync'](__dirname+_0x82d395(0xe7));_0x4f3702[_0x82d395(0xdf)](async _0x4201bf=>{const _0x478993=_0x82d395;let _0x58b1b7=fs[_0x478993(0xef)](__dirname+'/Commands/'+_0x4201bf+_0x478993(0xe7));_0x58b1b7=_0x58b1b7[_0x478993(0xd9)](_0x4f43cd=>_0x4f43cd['endsWith']('.js')),_0x58b1b7[_0x478993(0xdf)](_0x382b13=>{const _0x275105=_0x478993;bot['loadCmd'](__dirname+_0x275105(0xde)+_0x4201bf+'/Commands/'+_0x382b13);});});let _0x2adf3c=fs['readdirSync'](__dirname+'/Events');_0x2adf3c=_0x2adf3c[_0x82d395(0xd9)](_0x43796e=>_0x43796e['endsWith']('.js')),_0x2adf3c[_0x82d395(0xdf)](_0x5aba8f=>{const _0x275b09=_0x82d395;let _0x5c818f=![];if(bot[_0x275b09(0xdb)][_0x275b09(0xd5)][_0x275b09(0xe6)][_0x275b09(0xe2)](_0x5aba8f))_0x5c818f=!![];bot[_0x275b09(0xf6)](__dirname+_0x275b09(0xed)+_0x5aba8f,_0x5aba8f[_0x275b09(0xe4)](0x0,_0x5aba8f[_0x275b09(0xf1)]-0x3),_0x5c818f);});let _0x1fafac=fs[_0x82d395(0xef)](__dirname+_0x82d395(0xf4));_0x1fafac[_0x82d395(0xdf)](_0x308775=>{const _0x5ceb18=_0x82d395;bot[_0x5ceb18(0xeb)](__dirname+_0x5ceb18(0xea)+_0x308775);});let _0x8e20fd=fs[_0x82d395(0xef)](__dirname+_0x82d395(0xdd));_0x8e20fd[_0x82d395(0xdf)](_0x1dd085=>{const _0x222951=_0x82d395;bot['loadMongoEvent'](__dirname+_0x222951(0xf3)+_0x1dd085,_0x1dd085[_0x222951(0xe4)](0x0,_0x1dd085[_0x222951(0xf1)]-0x3));}),bot[_0x82d395(0xd8)](),console['log'](_0x82d395(0xdc));};console['clear'](),init(),process['on'](_0x5484e7(0xee),_0x409538=>{const _0x637871=_0x5484e7;bot[_0x637871(0xe3)][_0x637871(0xda)](''+_0x409538,_0x637871(0xf0),_0x637871(0xee),_0x637871(0xd7));}),process['on'](_0x5484e7(0xf2),_0x10b5e1=>{const _0xd5b9d4=_0x5484e7;bot['logger'][_0xd5b9d4(0xda)](''+_0x10b5e1,_0xd5b9d4(0xec),_0xd5b9d4(0xf2),_0xd5b9d4(0xd7));});
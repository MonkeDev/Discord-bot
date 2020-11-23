const eris = require("eris");

module.exports = class Client extends eris.Client{
    constructor(token, options){
        super(token, options);



        this.cmdsAndAlli = new Map();
    }

    get constants(){
        return {
            Eris: require("../Constants/Eris"),
            Config: require("../Constants/Config")
        };
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
        if(once == true) this.once(eventName, ...args => file.run(...args));
        else this.on(eventName, (...args) => file.run(...args));
    }
} 
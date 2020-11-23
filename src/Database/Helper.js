const mongo = require('mongoose');
module.exports = class{
    constructor(connectUrl, connectOptions){
        this.connectUrl = connectUrl;
        this.connectOptions = connectOptions;
    }

    async connect(){
        return await mongo.connect(this.connectUrl, this.connectOptions)
    }
}
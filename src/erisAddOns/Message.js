module.exports = eris => {
    eris.Message.prototype.reply = function(content, file){
        if(typeof content != "object") content = {
            content: content
        }
        content.messageReference = { messageID: this.id }
        return this.channel.client.createMessage.call(this.channel.client, this.channel.id, content, file);
    }
}



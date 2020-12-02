module.exports = eris => {
    eris.Message.prototype.reply = function(content, file){
        if(typeof content != "object") content = {
            content: content
        }
        content.messageReference = { messageID: this.id }
        return this.channel.client.createMessage.call(this.channel.client, this.channel.id, content, file);
    }
    Object.defineProperty(eris.Message.prototype, "delete", {
        value: function(reason, timeout) {
            if(timeout){
                setTimeout(() => {
                    return this._client.deleteMessage.call(this._client, this.channel.id, this.id, reason);
                }, timeout);
            }else return this._client.deleteMessage.call(this._client, this.channel.id, this.id, reason);
        }
    })

}
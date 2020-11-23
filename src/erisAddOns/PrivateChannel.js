module.exports = eris => {
    eris.PrivateChannel.prototype.send = function(content, file){

        return this.client.createMessage.call(this.client, this.id, content, file);

    }
}
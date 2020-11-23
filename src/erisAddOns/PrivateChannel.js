module.exports = eris => {
    eris.PrivateChannel.prototype.send = eris.PrivateChannel.prototype.createMessage;


    eris.PrivateChannel.prototype.sendRedEmbed = function(content){
        this.client.createMessage.call(this.client, this.id, { embed: { color: 0xff0000, description: content } });
    }

    eris.PrivateChannel.prototype.sendGreenEmbed = function(content){
        this.client.createMessage.call(this.client, this.id, { embed: { color: 0x00ff00, description: content } });
    }
}
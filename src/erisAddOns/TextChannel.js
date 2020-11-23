module.exports = eris => {
    eris.TextChannel.prototype.send = eris.TextChannel.prototype.createMessage;

    eris.TextChannel.prototype.sendRedEmbed = function(content){
        this.client.createMessage.call(this.client, this.id, { embed: { color: 0xff0000, description: content } });
    }

    eris.TextChannel.prototype.sendGreenEmbed = function(content){
        this.client.createMessage.call(this.client, this.id, { embed: { color: 0x00ff00, description: content } });
    }
}
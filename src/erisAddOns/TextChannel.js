module.exports = eris => {
    eris.TextChannel.prototype.send = eris.TextChannel.prototype.createMessage;
}
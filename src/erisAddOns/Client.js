module.exports = eris => {
    eris.Client.prototype.sendMessage = eris.Client.prototype.createMessage;
};
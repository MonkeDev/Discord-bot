module.exports = eris => {
    eris.Client.prototype.sendMessage = eris.Client.prototype.createMessage;
    
    eris.Client.prototype.editChannelPosition = function(channelID, position) {
        let guildData = this.guilds.get(this.channelGuildMap[channelID]);
        const channel = guildData ? guildData.channels.get(channelID) : this.getChannel(channelID);
        if(!channel) {
            return Promise.reject(new Error(`Channel ${channelID} not found`));
        }
        if(channel.position === position) {
            return Promise.resolve();
        }
        const min = Math.min(position, channel.position);
        const max = Math.max(position, channel.position);
        channels = channels.filter((chan) => {
            return chan.type === channel.type
                && min <= chan.position
                && chan.position <= max
                && chan.id !== channelID;
        }).sort((a, b) => a.position - b.position);
        if(position > channel.position) {
            channels.push(channel);
        } else {
            channels.unshift(channel);
        }
        return this.requestHandler.request("PATCH", Endpoints.GUILD_CHANNELS(this.channelGuildMap[channelID]), true, channels.map((channel, index) => ({
            id: channel.id,
            position: index + min
        })));
    }
    
};
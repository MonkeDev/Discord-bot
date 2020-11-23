module.exports = eris => {
    Object.defineProperty(eris.User.prototype, "tag", {
        get: function() {
            return `${this.username}#${this.discriminator}`
        }
    })
}
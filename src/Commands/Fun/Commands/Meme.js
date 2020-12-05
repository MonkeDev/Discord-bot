const fetch = require('node-fetch');

const baseCmd = require("../../../Structors/Command");
module.exports = class extends baseCmd {
    constructor(bot){
        super(bot, {
            name: "meme",
            dms: true,
            category: "Fun",
            description: "Sends a random meme from reddit",
            usage: "meme"
        })
    }

    async run(msg, args, data){

        let sub = this.bot.getRandomArrayElement(['meme', 'memes', 'dankmemes', 'dankmeme'])
        let fetched = await fetch(`https://www.reddit.com/r/${sub}/hot/.json`);
        fetched = await fetched.json();

        let post = fetched.data.children[Math.floor(Math.random() * fetched.data.children.length)];
        post = post.data;
        msg.channel.send({embed: {

            description: `[${post.title}](https://reddit.com${post.permalink})`,

            image: {
                url: post.url
            },

            footer: {
                text: `👍 ${Math.floor(post.ups / post.upvote_ratio)}, 👎 ${Math.round(post.ups * (1 - post.upvote_ratio) / (2 * post.upvote_ratio) + 1)}`
            },
            color: this.bot.constants.Colors.main,
        }})
        
    }
}
import oversmash from 'oversmash'
const ow = oversmash();
var Discord = require("discord.js");

// Create a client
var bot = new Discord.Client();
var triggerWord = "oooga";
var word = "booga"



// This code will run once the bot has started up.
bot.on("ready", function () {
	console.log(bot.id);
    console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
});

// This code will run once the bot has disconnected from Discord.
bot.on("disconnected", function () {
    // alert the console
    console.log("Disconnected!");
	
    // exit node.js with an error
    process.exit(1);
});

// This code will run once the bot receives any message.
bot.on("message", function (msg) {
    // if message begins with "ping"
	var wordsA = msg.content.split(" ");
	if(wordsA[0].toLowerCase().indexOf("!change") === 0 && wordsA.length >= 2 && msg.author.username != bot.username){
		triggerWord = wordsA[1];
		msg.channel.sendMessage("Trigger changed to " + triggerWord + " by " + msg.author.username);
		console.log("Trigger changed to " + triggerWord + " by " + msg.author.username);
	}
	
	if(wordsA[0].toLowerCase().indexOf("!word") === 0 && wordsA.length >= 2 && msg.author.username != bot.username){
		word = msg.content.substring(wordsA[0].length, msg.content.length);
		msg.channel.sendMessage("Word changed to " + word + " by test " + msg.author.username);
		console.log("Word changed to " + word + " by " + msg.author.username);
	}
	
    if (wordsA[0]content.toLowerCase().indexOf(triggerWord) === 0 && msg.author.username != bot.username) {
        // send a message to the channel the ping message was sent in.
        msg.channel.sendMessage(word);
		
        // alert the console
        console.log("ping-ed " + msg.author.username);
    }
	
	if(wordsA[0].content.toLowerCase().indexOf('find') === 0){
		ow.player('jonzezzz-1479').then(player =>{
			msg.channel.sendMessage(player);
		}
	}
});

// Login (replace these auth details with your bot's)

bot.login(process.env.BOT_TOKEN);


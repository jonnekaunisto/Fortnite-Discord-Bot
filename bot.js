var OverwatchAPI = require('./overwatch.js');
var Discord = require("discord.js");
var request = require('request');

//const ow = oversmash();
// Create a client
var bot = new Discord.Client();
var triggerWord = "oooga";
var word = "booga";

/*
 var options = {
    method: "GET",
    url: 'https://api.fortnitetracker.com/v1/profile/pc/' + player,
    headers: {
      'User-Agent': 'nodejs request',
      'TRN-Api-Key' :"b8725b06-0df4-4302-8d4c-dda2ac2814ab"
    }
 }
 */
 
 /*
 var options = {
    method: "GET",
    url: 'https://fortnite.y3n.co/v2/player/jonzezzz',
    headers: {
      'User-Agent': 'nodejs request',
      'X-Key' :"gBlzQGZb6gHgNVfWlLVG"
    }
 }
 */
 
 function printFortNiteStats(message, player){
	var result = "";
	var options = {
		method: "GET",
		url: 'https://fortnite.y3n.co/v2/player/' + player,
		headers: {
		  'User-Agent': 'nodejs request',
		  'X-Key' :"gBlzQGZb6gHgNVfWlLVG"
		}
	}
 
	request(options, (error, response, body) => {
		if(error != 'null' && response.statusCode == 200){
			console.log('plz print');
			var stats = JSON.parse(body);
			//console.log(stats);
			//var obj = `${stats.br.profile.level}`;
			var obj = stats.br.profile.level;
			var str = JSON.stringify(obj);
			console.log("string thingy " + str);
			result = str;
			message.channel.sendMessage('```Level is: '+str+'```');
		}
	});
	return result;
	
}
 

function printFortNiteStats1(message){
	var result = "";
	request(options, (error, response, body) => {
		console.log('yay');
		console.log(error);

		console.log('plz print');
		var stats = JSON.parse(body);
		//console.log(stats);
		console.log(`${stats.accountId}`);
		var obj = `${stats.accountId}`;
		var str = JSON.stringify(obj);
		console.log("string thingy " + str);
		result = str;
		message.channel.sendMessage(str);
	});
	
}



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
	if(wordsA[0].toLowerCase().indexOf("!change") === 0 && wordsA.length >= 2){
		triggerWord = wordsA[1];
		msg.channel.sendMessage("Trigger changed to " + triggerWord + " by " + msg.author.username);
		console.log("Trigger changed to " + triggerWord + " by " + msg.author.username);
	}
	
	if(wordsA[0].toLowerCase().indexOf("!word") === 0 && wordsA.length >= 2){
		word = msg.content.substring(wordsA[0].length, msg.content.length);
		msg.channel.sendMessage("Word changed to " + word + " by test " + msg.author.username);
		console.log("Word changed to " + word + " by " + msg.author.username);
	}
	
    if (wordsA[0].toLowerCase().indexOf(triggerWord) === 0) {
        // send a message to the channel the ping message was sent in.
        msg.channel.sendMessage(word);
		
        // alert the console
        console.log("ping-ed " + msg.author.username);
    }
	
	if(wordsA[0].toLowerCase().indexOf('!stats') === 0){
		var rank = printFortNiteStats(msg, wordsA[1]);
		//console.log(rank);
		//msg.channel.sendMessage(rank);
	}
});

// Login (replace these auth details with your bot's)

//bot.login(process.env.BOT_TOKEN);
bot.login('NDI3MjI0NzU2ODE5ODUzMzIz.DZhkeQ.I30e6oT3ab-iOXgpejNd_aDBZFk');//mine






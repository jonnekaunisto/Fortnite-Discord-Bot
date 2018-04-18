var Discord = require("discord.js");
var request = require('request');

// Create a client
var bot = new Discord.Client();
var triggerWord = "hi";
var word = "Hi!";
var fortniteAPIKey = process.env.FORTNITE_KEY;
var dict = {};
var japaneseCharacters = "卂乃匚刀乇下厶卄工丁长乚从𠘨口尸㔿尺丂丅凵リ山乂丫乙 ";
var alphabet = "abcdefghijklmnopqrstuvwxyz ";

for(int i = 0; i < alphabet.length(); i++){
	dict[alphabet.charAt(i)] = japaneseCharacters.charAt(i);
}

/*
 var options = {
    method: "GET",
    url: 'https://api.fortnitetracker.com/v1/profile/pc/' + player,
    headers: {
      'User-Agent': 'nodejs request',
      'TRN-Api-Key' :""
    }
 }
 */

 /*
 var options = {
    method: "GET",
    url: 'https://fortnite.y3n.co/v2/player/jonzezzz',
    headers: {
      'User-Agent': 'nodejs request',
      'X-Key' :""
    }
 }
 */

 function printFortNiteStats(message, player){
	var result = "```";
	var options = {
		method: "GET",
		url: 'https://fortnite.y3n.co/v2/player/' + player,
		headers: {
		  'User-Agent': 'nodejs request',
		  'X-Key' : fortniteAPIKey
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
			result += "Level is: " + str + '\n';
      var kills = stats.br.stats.pc.all.kills;
      str= JSON.stringify(kills);
      result+="Total Kills: "+ str + '\n';
      var matchesplayed =stats.br.stats.pc.all.matchesPlayed;
      str=JSON.stringify(matchesplayed);
      result+="Matches Played: " + str + '\n';
      var score = stats.br.stats.pc.all.score;
      str=JSON.stringify(score);
      result+="Score "+str + '\n';




      result += "```";
      console.log(result);
			message.channel.sendMessage(result);
		}
	});
	return result;

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
	}
	
	if(wordsA[0].toLowerCase().indexOf('!jap') === 0){
		var word = msg.content.substring(3, msg.content.length());
		var result = "";
		for(int i = 0; i < word.length(); i++){
			result = dict[word.charAt(i)];
		}
		msg.channel.sendMessage(result)
	}
});

// Login (replace these auth details with your bot's)

bot.login(process.env.BOT_TOKEN);


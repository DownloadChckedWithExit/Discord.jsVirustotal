const discord = require('discord.js');
const client = new discord.Client();
const fs = require("fs");
const request = require("request");
const VirusTotalApi = require('virustotal-api')
// Create account and pickup your api key(this is a example, not work)
const virusTotal = new VirusTotalApi('hbah1321dfafbagjfgajm41ngahguya423bnghi44141abgyahb')

client.on('ready', () =>{ 
	console.log("Oh, okay bot on-line!");
});

client.on("message", (message) => {

	if (message.author.bot || message.channel.type === "dm") return;
	if (message.attachments.first() && message.attachments.first().size > 0) {

	const urlarchive = message.attachments.array()[0].url; 
	const tempName = urlarchive.split("/");
	const attachName = tempName[tempName.length-1]
	const l = attachName;

	function download(url){ require("request").get(url).pipe(fs.createWriteStream(attachName));}
		
	if (l.lenght <= 0) return;	
	if (l.includes(".jpeg") || l.includes(".png") || l.includes(".jpg") || l.includes(".gif") || l.includes(".txt") || l.includes(".mp4") || l.includes(".mp3") || l.includes(".mkv") || l.includes(".JPEG") || l.includes(".PNG") || l.includes(".JPG") || l.includes(".GIF") || l.includes(".TXT") || l.includes(".MP4") || l.includes(".MP3") || l.includes(".MKV")) {return;}
				
    	download(urlarchive);			
	message.delete().catch(O_o => O_o);
	
	// Sending message... or Checking file
	message.channel.send("⚠️ Checking the file "+ "``"+attachName+"``" +", Checking with VirusTotal").then(mensageminicial => {
    
	let replies = ["30000", "45000", "60000", "120000", "180000", "240000"]
	let result = Math.floor((Math.random() * replies.length));

	setTimeout(() => {

		function intervalo() {
		fs.readFile(attachName, (err, data) => { 
  		if (err) {console.log(`Cannot read file. ${err}`)} else {
		virusTotal.fileScan(data, 'file.js').then((response) => {
		virusTotal.fileReport(response.resource).then((result) => {
            	if (result.verbose_msg == 'Your resource is queued for analysis') return;
			if (result.verbose_msg === 'Scan finished, information embedded') {
			clearInterval(this);
			if (result.positives > 1 || result.positives === 1) {
					message.delete().catch(O_o => O_o);
					fs.unlinkSync(attachName);
                  	message.channel.send("**(Alert)** File checked. Download not allowed. (Message sent by: <@"+message.author.id + "> ["+message.author.id+"])");
                  	mensageminicial.delete().catch(O_o => O_o);
                  	return;
			  } else {
                	message.channel.send("**(Ok)** File checked. Download the file: (Message sent by: <@"+message.author.id + "> ["+message.author.id+"])", {files: [urlarchive]});
				    fs.unlinkSync(attachName);
                	mensageminicial.delete().catch(O_o => O_o);
			  }
			  return;
			}
			}).catch(err => {clearInterval(this); setInterval(intervalo, replies[result]);});
		}).catch(err => {clearInterval(this); setInterval(intervalo, replies[result]);});
    	}})}
	setInterval(intervalo, 15000);

	// Time for "start process", Time recommended:5000
	}, 5000); 
})}});

// Token for bot star the bot :>
client.login('Token');

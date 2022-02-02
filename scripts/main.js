nowPlaying = "null - null"
//start the title track tile shower when the page is ready
document.addEventListener("DOMContentLoaded", function(){
	getMetaData();
	//I HAVE NO CLUE HOW THIS FIXES THE SAFARI BUG BUT WHATEVER IT WORKS NOW
	//setTimeout(startPlayback,500);
	// ??NO??
})

//load the audio and play it to get around the safari infiload bug
function startPlayback() {
	audioTag = document.querySelector("audio");
	audioTag.load();
	audioTag.play();
}

//function for getting, parsing, and displaying the track info
function getMetaData() {
	//fetch the server info
	fetch("https://radio.ngrok.io/status-json.xsl").then( res => {
		//parse the json from the server
		res.json().then( json => {
			//display the track title
			document.querySelector("#trackTitle").innerHTML = "NOW PLAYING: " + json.icestats.source.title;
			//add the title to the audio player
			document.querySelector("audio").title = "MOCRD RADIO - " + json.icestats.source.title;

			//fuck it, constant albumn art check
			getArtwork();
		})
	})
	setTimeout(getMetaData,5000);
};
function getArtwork () {
	fetch("https://iceimagegen.ngrok.io/art").then( res => {
		console.log(res);
		res.text().then( text => {
			console.log(text);
			if (text == "no art") {
				document.querySelector("#albumArt").src = "images/noArt.png";
			} else {
				document.querySelector("#albumArt").src = text;
			}
		})
	});
}


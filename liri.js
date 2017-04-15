////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

//At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.//


var request = require("request");
var spotify = require("spotify");
var Twitter = require("twitter");
var fs = require("fs");
var keys = require("./key.js");

var tweetKeys = keys.twitterKeys;
var client = new Twitter(tweetKeys);

var command = process.argv[2];
var argument = process.argv[3];
var output;

// The switch-case will direct which function gets run
switch (command) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}

function spotifyThisSong() {

    if (argument === undefined) {
        argument = "The Sign";
    }
	spotify.search({type: "track", query: argument},
	
	function(error, data){
        if (!error){

            for (var i = 0; i < data.tracks.items.length; i++)

        		var songData = data.tracks.items[i];

                output = ("\n" + "Artist: " + songData.artists[0].name + "\n" + "Song: " + songData.name + "\n" + "Album: " + songData.album.name + "\n" + "Preview URL: " + songData.preview_url + "\n");
                console.log(output);
        
        }else{

			console.log("Spotify Error")

		}
	});
}

function myTweets() {
    //Twitter parameters to retrieve your last 20 tweets (count defaults to 15)
    var params = { screen_name: 'SusanArend', "count": 20 };
    //Using params, we can request to GET a response from the Twitter API
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        //if there were no erroes and the response code was 200 (i.e. the request was successful) then return 20 elements in the array of tweets
        if (!error && response.statusCode === 200) {
            for (var i = 0; i < tweets.length; i++) {
                //store returned elements into output and console log them in node.js
                output = ("\n" + "@" + params.screen_name + " said " + tweets[i].text + " at " + tweets[i].created_at + "\n");
                console.log(output);
            }
        } else {
            console.log("Twitter Error");
        }
    });
}

// If the "moviethis" function is called...
function movieThis() {
    if (argument === undefined) {
        argument = "Mr Nobody";
    }
    var queryURL = "http://www.omdbapi.com/?t=" + argument + "&y=&plot=short&r=json";
    // Then run a request to the OMDB API with the movie specified
    request(queryURL, function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the elements
            output = ("\n" + "Movie Title: " + JSON.parse(body).Title + "\n" + "Movie Year: " + JSON.parse(body).Year + "\n" + "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" + "Country Where Produced: " + JSON.parse(body).Country + "\n" + "Language: " + JSON.parse(body).Language + "\n" + "Plot: " + JSON.parse(body).Plot + "\n" + "Actors: " + JSON.parse(body).Actors + "\n" + "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value);
            console.log(output);
        } else {
            console.log("OMDB Error")
        }
    });
}
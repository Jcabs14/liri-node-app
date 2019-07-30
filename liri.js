require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//requirements
var axios = require('axios');
var nodeSpotify = require('node-spotify-api');
var moment = require ('moment');

userInput = process.argv[2];
userInput2 = process.argv[3];

//commands needed
//concert-this
//spotify-this-song
//movie-this
//do-what-it-says

//search concerts
if(userInput === 'concert-this'){

    var artist = userInput2;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response){
        HTMLFormControlsCollection.log(response.data);
    });
}
//search spotify
if(userInput === 'spotify-this-song'){

}

//search movie
if(userInput === 'movie-this'){

}

//do-what command
if(userInput === 'do-what-it-says'){

}


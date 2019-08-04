require("dotenv").config();

//requirements
var axios = require('axios');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('fs');

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];
var userInput2 = process.argv[3];

//commands needed
//concert-this
//spotify-this-song
//movie-this
//do-what-it-says

//search concerts
if (userInput === 'concert-this') {

    var artist = userInput2;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {

        for (var i = 0; i < response.data.length; i++) {

            var datetime = response.data[i].datetime; //Saves datetime response into a variable

            var concertResults = "\nVenue Name: " + response.data[i].venue.name +
                "\nVenue Location: " + response.data[i].venue.city +
                "\nDate of the Event: " + moment(datetime).format("MM/DD/YYYY");
            console.log(concertResults);
        }
    })
        .catch(function (error) {
            console.log(error);
        });
}

//search  song with spotify
if (userInput === 'spotify-this-song') {
    var songName = userInput2;
    if (!userInput2) {
        var songName = "The Sign";
    }
    spotify.search({ type: 'track', query: songName }, function (err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var i = 0; i < 10; i++) {
            //Artist(s)
            var artists = response.tracks.items[i].album.artists[0].name;

            //The song's name
            var songTitle = response.tracks.items[i].name;

            //A preview link of the song from Spotify

            var previewLink = response.tracks.items[i].external_urls.spotify;

            //The album that the song is from
            var albumName = response.tracks.items[i].album.name;

            //display info
            console.log("Song Name: " + songTitle + "\n" + "Artist(s): " + artists + "\n" + "Album name: " + albumName + "\n" + "Preview Link: " + previewLink + "\n");
        }
    });



}

//search movie
if (userInput === 'movie-this') {
    var movieTitle = userInput2;
    if (!userInput2) {
        var movieTitle = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=dad1a254").then(
        function (response) {

            //we need the following
            //Title of the movie.
            var title = response.data.Title;
            //Year the movie came out.
            var year = response.data.Released;
            //IMDB Rating of the movie.
            var rating = response.data.imdbRating;
            //Rotten Tomatoes Rating of the movie.
            var tomatoeRating = response.data.Ratings[1].Value;
            //Country where the movie was produced.
            var country = response.data.Country;
            //Language of the movie.
            var language = response.data.Language;
            //Plot of the movie.
            var plot = response.data.Plot;
            //Actors in the movie.
            var actors = response.data.Actors;

            console.log("\n" + 'Movie title: ' + title + "\n" + 'Released date:' + year + "\n" +
                'imbd rating: ' + rating + "\n" + 'rotton tomatoes rating: ' + tomatoeRating + "\n" + 'country: ' + country + "\n" + 'language: ' + language + "\n" + 'plot: ' + plot + "\n" + 'actors: ' + actors);
        }
    ).catch(function (error) {
        // handle error
        console.log(error);
    });
}

//do-what command
if (userInput === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        var songName = dataArr[0];
        spotify.search({ type: 'track', query: songName }, function (err, response) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
    
            for (var i = 0; i < 10; i++) {
                //Artist(s)
                var artists = response.tracks.items[i].album.artists[0].name;
    
                //The song's name
                var songTitle = response.tracks.items[i].name;
    
                //A preview link of the song from Spotify
    
                var previewLink = response.tracks.items[i].external_urls.spotify;
    
                //The album that the song is from
                var albumName = response.tracks.items[i].album.name;
    
                //display info
                console.log("Song Name: " + songTitle + "\n" + "Artist(s): " + artists + "\n" + "Album name: " + albumName + "\n" + "Preview Link: " + previewLink + "\n");
            }
        });
    })

}


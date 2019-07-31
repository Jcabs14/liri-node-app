require("dotenv").config();

//requirements
var axios = require('axios');
// var Spotify = require('node-spotify-api');
// var moment = require ('moment');

// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];
var userInput2 = process.argv[3];

//commands needed
//concert-this
//spotify-this-song
//movie-this
//do-what-it-says

//search concerts
if (userInput === 'concert-this') {

    var artist = 'taylor swift';
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (response) {
        console.log(response);
    });
}
//search spotify
if (userInput === 'spotify-this-song') {

}

//search movie
if (userInput === 'movie-this') {
    var movieTitle = userInput2;
    axios.get("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy").then(
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

            console.log('Movie title: ' + title + "\n" + 'Released date:' + year + "\n" +
                'imbd rating: ' + rating + "\n" + 'rotton tomatoes rating: ' + tomatoeRating + "\n" + 'country: ' + country + "\n" + 'language: ' + language + "\n" + 'plot: ' + plot + "\n" + 'actors: ' + actors);
        }
    );
}

//do-what command
if (userInput === 'do-what-it-says') {

}


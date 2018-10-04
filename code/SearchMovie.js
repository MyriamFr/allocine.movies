
var qsSearch = require("./api/qsSearch.js");
var qsMovie = require("./api/qsMovie.js");
var CreateMovie = require("./utils/createMovie.js");

/* -------------------------------------------------------------------- */

function searchMovie (movieTitle)
{
  console.log("@ searchMovie()");
  
  //
  // TEST: User didn't say the movie title
  //
  if (movieTitle == undefined || movieTitle == null)
  {
    searchMovieResults.resultStatus = 300;
    console.log("- MovieTitle UserSaid No");
    return searchMovieResults;
  }
  else { console.log ("- MovieTitle UserSaid Yes: " + movieTitle); }
  
  var searchMovieResults = {};
  searchMovieResults.movieTitle = movieTitle;
  
  //
  // STEP 1:
  //  Find IDs of the movies with the given title.
  //  API query: search():SearchResultsConnection
  //
  
  var searchResultsConnection = qsSearch.qsSearch (movieTitle, searchMovieResults);
  
  var movieIDs = [];
  if (searchMovieResults.resultStatus == 100)
  {
    for (var i = 0; i < searchResultsConnection.edges.length; i++)
    {
      if (searchResultsConnection.edges[i].node.node.__typename == "Movie")
      {
        movieIDs[i] = searchResultsConnection.edges[i].node.node.id;
      }
    }
  }
  
  //
  // STEP 2:
  //  Extract all movies found using their ID.
  //  API query: movie():Movie
  //
  
  // limitation du nombre de résultats sinon problème de connection de l'api
  // "Je n'arrive pas à me connecter. Peux-tu réessayer plus tard ?"
  var maxCount = 5;
  var resultCount = movieIDs.length > maxCount ? maxCount : movieIDs.length;
  
  // Extract all movies found from the API.
  var movies = [];
  for (var j = 0; j < resultCount; j++)  // j < movieIDs.length
  {
    movies[j] = qsMovie.qsMovie (movieIDs[j]);
  }
  
  //
  // STEP 3:
  //  Populate the output of the SearchMovie action: SearchMovieResults
  //

  searchMovieResults.moviesConnection = {};
  searchMovieResults.moviesConnection.movies = [];
  
  for (k = 0; k < movies.length; k++)
  {
    // Filter short videos (e.g. 5 min feature videos)
    if (movies[k].runTime && movies[k].runTime.split(":")[0] == "00")
    {
      console.log("Runtime filter: " + movies[k].runTime, movies[k].title);
      continue;
    }

    var len = searchMovieResults.moviesConnection.movies.push(CreateMovie.createMovie(movies[k]));    
  }
  searchMovieResults.moviesConnection.totalCount = searchMovieResults.moviesConnection.movies.length;
  
  console.log("totalCount: " + searchMovieResults.moviesConnection.totalCount);
  console.log("resultStatus: " + searchMovieResults.resultStatus);
  console.log(searchMovieResults.moviesConnection.movies);
  
  return searchMovieResults;
}

/* -------------------------------------------------------------------- */

module.exports = {
  function: searchMovie
}

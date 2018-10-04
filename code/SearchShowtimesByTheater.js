
var qsSearch = require("./api/qsSearch.js");
var qsMovie = require("./api/qsMovie.js");
var qsTheaterList = require("./api/qsTheaterList.js");
var qsMovieShowtimeList = require("./api/qsMovieShowtimeList.js");
var CSBT = require("./utils/createShowtimesByTheater.js");
var CreateMovie = require("./utils/createMovie.js");

/* -------------------------------------------------------------------- */

function searchShowtimesByTheater (movieTitle, theaterName, fromTime)
{
  console.log ("@ searchShowtimes (movieTitle, theaterName, fromTime)");
  var searchShowtimesByTheaterResults = {};
  
  //
  // Looking for the movie asked by the user
  //
  
  var searchMovieResults = {};  
  searchMovieResults.movieTitle = movieTitle;
  var searchResultsConnection = qsSearch.qsSearch (movieTitle, searchMovieResults);
  var movieObject = qsMovie.qsMovie (searchResultsConnection.edges[0].node.node.id);
  var movie = CreateMovie.createMovie(movieObject);
  var movieID = movie.id; // recherche par ID plus précise que recherche par MovieTitle
  
  if (movie) {
    searchShowtimesByTheaterResults.movieTitle = movie.title; // actual movie title
  }
  else {
    searchShowtimesByTheaterResults.movieTitle = movieTitle; // movie title given by the user
  }
  console.log(movieObject);

  //
  // TEST parameters validity: testQueryParams (below in this file)
  //

  searchShowtimesByTheaterResults.theaterName = theaterName;
  searchShowtimesByTheaterResults.resultStatus = testQueryParams (movieObject, movieTitle, theaterName, fromTime);
  if (searchShowtimesByTheaterResults.resultStatus != 1)
  {
    return searchShowtimesByTheaterResults; 
  }
  var params = constructQueryParams(movieID, movieTitle, theaterName, fromTime);
  
  //
  // STEP 1:
  //  Looking for the IDs of the theaters with the theater name given by the user.
  //  API query: theaterList():TheaterConnection
  //
  
  var theaterList = qsTheaterList.qsTheaterList(params);
  if (theaterList.edges.length == 0)
  {
    // --- Bixby couldn't find any movie theater with the given name.
    searchShowtimesByTheaterResults.resultStatus = 210;
    searchShowtimesByTheaterResults.theaterName = theaterName;  // name given by the user
    return searchShowtimesByTheaterResults;
    //// -- TODO -- si trouve pas la salle -> mal compris ? -> redemander
  }
  searchShowtimesByTheaterResults.theaterName = theaterList.edges[0].node.name; // actual name of the theater
  
  //
  // STEP 2:
  //  Looking for showtimes in the movie theaters found
  //  API query: movieShowtimeList():MovieShowtimes
  //
  
  searchShowtimesByTheaterResults.showtimesByTheater = [];
  
  for (var i = 0; i < theaterList.edges.length; i++)
  {
    console.log("i: " + i + " - "+ theaterList.edges.length);
    
    // the i-th movie theater
    var theater = theaterList.edges[i].node;
    
    // getting the showtimes in the i-th movie theater
    var movieShowtimes = qsMovieShowtimeList.qsMovieShowtimeList(params, theater.id);

    // no showtimes for this movie in the i-th movie theater
    if (movieShowtimes.totalCount == 0) { continue; }
    
    // found showtimes for this movie in the i-th movie theater
    searchShowtimesByTheaterResults.showtimesByTheater.push(CSBT.createShowtimesByTheater(theater, movie, movieShowtimes));
  }
  
  
  // --- The movie is not shown in this theater.
  if (searchShowtimesByTheaterResults.showtimesByTheater.length == 0)
  {
    searchShowtimesByTheaterResults.resultStatus = 0;
    console.log("- NoResult: " + searchShowtimesByTheaterResults.resultStatus);
  }
  // ---The movie is shown in this theater. (Result = Multi || Single)
  else
  {
    searchShowtimesByTheaterResults.resultStatus = 100;
    console.log("- Result: " + searchShowtimesByTheaterResults.resultStatus);
  }
  
  console.log("RESULT STATUS: " + searchShowtimesByTheaterResults.resultStatus);
  console.log("MOVIE TITLE: " + searchShowtimesByTheaterResults.movieTitle);
  console.log("THEATER NAME: " + searchShowtimesByTheaterResults.theaterName);
  console.log("SHOWTIMESBYTHEATER: ");
  console.log(searchShowtimesByTheaterResults.showtimesByTheater.movieShowtimes);
  
  return searchShowtimesByTheaterResults;
}

module.exports = {
  function: searchShowtimesByTheater
}

/* -------------------------------------------------------------------- */
/*                        TEST QUERY PARAMS                             */
/* -------------------------------------------------------------------- */

function testQueryParams (movie, movieTitle, theaterName, fromTime)
{
  console.log ("@ testQueryParams (movieTitle, theaterName, fromTime)");
  var resultStatus = 1;
  
  // --- MovieTitle UserSaid No
  if (movieTitle == undefined || movieTitle == null)
  {
    resultStatus = 300;
    console.log("- MovieTitle UserSaid No");
    console.log(". resultStatus: " + resultStatus);
    return resultStatus;
  }
  else { console.log ("- MovieTitle UserSaid Yes: " + movieTitle); }
  
  if (movie)
  {
    // --- MovieTitle ReleasedInTheaters No
    if (movie.releases && movie.releases[0] && movie.releases[0].releaseDate)
    {
      var today = new dates.ZonedDateTime.now();
      var releasedate = dates.ZonedDateTime.parseDate(movie.releases[0].releaseDate.date, "yyyy-M-d");
      if (releasedate.isAfter(today))
      {
        resultStatus = 310;
        console.log("- HasBeenReleasedInTheaters No!");
        console.log(". resultStatus: " + resultStatus);
        return resultStatus;
      }
      else { console.log ("- HasBeenReleasedInTheaters Yes: " + movie.releases[0].releaseDate.date); }
    }
    
    // --- MovieTitle FutureShowtimes Yes
    // if (movie.showtimesDates && movie.showtimesDates.length > 0)
    // {
    //   // console.log(movie.showtimesDates);
    //   var tab1 = movie.showtimesDates[0].split("-");  // TODO : avec date.parse + date.isAfter !!
    //   var eDate = new dates.ZonedDateTime.now().format('YYYY-MM-dd');
    //   var tab2 = eDate.split("-");
    //   if ( (tab1[0] > tab2[0]) || (tab1[1] > tab2[1]) || ( (tab1[1] >= tab2[1]) && (tab1[2] > tab2[2]) ) )
    //   {
    //     resultStatus = 320;
    //     console.log("- HasFutureShowtimes Yes");
    //     console.log(". resultStatus: " + resultStatus);
    //     return resultStatus;
    //   }
    // }
    // else { console.log ("- HasFutureShowtimes No"); }
    
    // --- MovieTitle HasShowtimes No
    if (movie.flags.hasShowtime === false)
    {
      resultStatus = 330;
      console.log("- HasShowtimes No!");
      console.log(". resultStatus: " + resultStatus);
      return resultStatus;
    }
    else { console.log ("- HasShowtimes Yes: " + movie.flags.hasShowtime); }
  }

  // --- TheaterName UserSaid No
  if (theaterName == undefined || theaterName == null)  // || city == undefined || city == null
  {
    resultStatus = 200;
    console.log("- TheaterName UserSaid No");
    console.log(". resultStatus: " + resultStatus);
    return resultStatus;
  }
  else { console.log ("- TheaterName UserSaid Yes: " + theaterName); }
  
  console.log("RESULT STATUS: " + resultStatus);
  return resultStatus;
}

/***************************************************************************/

function constructQueryParams (movieID, movieTitle, theaterName, fromTime)
{
  queryParams = {};
  
  movieTitle = encodeURI(movieTitle);
  movieTitle = movieTitle.replace ("'", "%27");
  movieTitle = movieTitle.replace ("-", "%2d");
  theaterName = encodeURI(theaterName);
  
  // Default 'from' parameter: from today at the current time  
  var eDate = new dates.ZonedDateTime.now().format('YYYY-MM-dd');
  var eTime = new dates.ZonedDateTime.now().format('HH:mm:ss');
  const from = String(eDate) + "T" + String(eTime);
  
  // Defaut 'to' parameter: today at midnight
  const to = String(eDate) + "T23:59:00";
  
  var queryParams = {
    "movieID": movieID,
    "movieTitle": movieTitle,
    "theaterName": theaterName,
    "fromTime": from,
    "toTime": to
  }
  
  console.log("$ movieID: " + movieID);
  console.log("$ movieTitle: " + movieTitle);
  console.log("$ theaterName: " + theaterName);
  console.log("$ fromTime: " + from);
  console.log("$ toTime: " + to);
  
  return queryParams;
}

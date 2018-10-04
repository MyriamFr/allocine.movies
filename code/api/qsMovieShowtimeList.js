
var API = require("./api.js");

/*
 * Executes the API query 'movieShowtimeList():MovieShowtimeList'
 *
 * @param { params } the parameters of the query (movie ID and theater ID)
 * @return { movieShowtimeList } a MovieShowtimeList
 */

function qsMovieShowtimeList (params, theaterID)
{
  console.log("@ movieShowtimesQuery(params, theaterIDs)");

  // var queryParams = "&query={movieShowtimeList(search:%22" + params.movieTitle + "%22,from:%22" + params.from + "%22,to:%22" + params.to + "%22,theater:%22" + theaterID + "%22,order:[SHOWTIME_DATE]){totalCount,edges{node{movie{title,poster{path,publicationDate,url},runTime},showtimes{startsAt,format,version}}}}}";
  
  var queryParams = "&query={movieShowtimeList(movie:%22" + params.movieID + "%22,theater:%22" + theaterID + "%22,order:[SHOWTIME_DATE]){totalCount,edges{node{movie{title,poster{path,publicationDate,url},runTime},showtimes{startsAt,format,version}}}}}";
  
  var response = API.query(queryParams);  
  var object = JSON.parse(response.responseText);
  var movieShowtimeList = object.data.movieShowtimeList;
  console.log(movieShowtimeList);
  
  return movieShowtimeList;
}

module.exports = {
  qsMovieShowtimeList: qsMovieShowtimeList
}


//
// QUERY OUTPUT:
//
// {"data":{"movieShowtimeList":{"totalCount":1,"edges":[{"node":{"movie":{"originalTitle":"Mademoiselle de Joncqui\u00e8res","title":"Mademoiselle de Joncqui\u00e8res","runTime":"01:49:00"},"showtimes":[{"startsAt":"2018-09-28T10:45:00","format":"DIGITAL","version":"FRENCH"},{"startsAt":"2018-09-28T13:50:00","format":"DIGITAL","version":"FRENCH"},{"startsAt":"2018-09-28T16:20:00","format":"DIGITAL","version":"FRENCH"},{"startsAt":"2018-09-28T19:15:00","format":"DIGITAL","version":"FRENCH"},{"startsAt":"2018-09-28T22:10:00","format":"DIGITAL","version":"FRENCH"}]}}]}}}

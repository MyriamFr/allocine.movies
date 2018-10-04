
var API = require("./api.js");

/*
 * Executes the API query 'movie():Movie'
 *
 * @param { movieID } ID of the movie in the API
 * @return { movie } a Movie
 */

function qsMovie (movieID)
{
  console.log ("@ qsMovie (movieId)");  
  
  var queryParams = "&query={movie(id:%22" + movieID + "%22){title,internalId,id,flags{hasTheaterRelease,hasShowtime},poster{path,publicationDate,url},credits(first:100){edges{node{person{firstName,lastName},position{name,department}}}},cast(first:100){edges{node{actor{firstName,lastName,picture{url}},role}}},releases(country:FRANCE){id,name,stringValue,country{name,localizedName},releaseDate{date,precision}},runTime,stats{userRating{score(base:5),count(base:5)},pressReview{score(base:5),count}},showtimesDates,genres,countries{name,localizedName},synopsis(long:false,strip:true)}}";
  
  // releases(country:FRANCE){id,name,stringValue,country{alpha2,alpha3,name,localizedName},releaseDate{date,precision}}
  
  var response = API.query(queryParams);
  var object = JSON.parse(response.responseText);
  var movie = object.data.movie; 
  console.log(movie);
  
  return movie;
}

module.exports = {
  qsMovie: qsMovie
}
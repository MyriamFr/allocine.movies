
/*
 * Converts a date from '2018-09-19' to '19 septembre 2018'
 */
function convertDateFormat (date)
{
  var newDate = "";
  
  var months = {
    "01": "janvier",
    "02": "février",
    "03": "mars",
    "04": "avril",
    "05": "mai",
    "06": "juin",
    "07": "juillet",
    "08": "août",
    "09": "septembre",
    "10": "octobre",
    "11": "novembre",
    "12": "décembre"
  }
  
  var tab = date.split("-");
  var day = tab[2];
  var month = months[tab[1]];
  var year = tab[0];
  
  newDate = String(day) + " " + String(month) + " " + String(year);
  
  return newDate;
}

/***************************************************************************/

function createMovie(movieObject)
{
  console.log("@ createMovie (movieObject)");
  
  var movie = {};
  
  // ID
  movie.id = movieObject.id;
  movie.hasShowtimes = movieObject.flags.hasShowtime;
  
  // TITLE
  movie.title = movieObject.title;
  // console.log("Movie title: " + movie.title);

  // RELEASE DATE
  // movieObject.releases[0] = en France
  console.log(movieObject.releases);
  console.log(movieObject.releases[0]);
  if (movieObject.releases && movieObject.releases.length > 0)
  {
    if (movieObject.releases[0].releaseDate && movieObject.releases[0].releaseDate.date)
    {
      movie.releaseDate = convertDateFormat(movieObject.releases[0].releaseDate.date);
      // console.log("Release date: " + movie.releaseDate);
    }
  }
  else
  {
    movie.releaseDate = "inconnue";
  }
  
  // POSTER
  if (movieObject.poster)
  {
    console.log(movieObject.poster.url);
    movie.poster = {};
    movie.poster.url = movieObject.poster.url;
    // console.log("Poster URL: " + movie.poster.url);
  }
  
  // SYNOPSIS
  if (movieObject.synopsis) {
    movie.synopsis = movieObject.synopsis;
    // console.log("Synopsis: " + movie.synopsis);
    console.log(movie.synopsis);
  }
  
  // CAST
  if (movieObject.cast && movieObject.cast.edges)
  {
    if (movieObject.cast.edges.length > 0)
    {
      movie.cast = {};  // CastMemberConnection object
      movie.cast.totalCount = movieObject.cast.edges.length;
      movie.cast.edges = [];  // list of CastMember objects 
      // console.log("Cast: " + movie.cast.totalCount);

      for (j = 0; j < movieObject.cast.edges.length; j++)
      {
        if (movieObject.cast.edges[j].node && movieObject.cast.edges[j].node.actor)
        {
          movie.cast.edges[j] = {};
          movie.cast.edges[j].actor = {};
          movie.cast.edges[j].actor.firstName = movieObject.cast.edges[j].node.actor.firstName;
          movie.cast.edges[j].actor.lastName = movieObject.cast.edges[j].node.actor.lastName;
        }
      }
    }
  }
  
  // CREDITS
  if (movieObject.credits && movieObject.credits.edges)
  {
    if (movieObject.credits.edges.length > 0)
    {
      movie.credits = {};  // CreditsConnection object
      movie.credits.totalCount = movieObject.credits.edges.length;
      movie.credits.edges = [];  // list of CreditsMember objects
      // console.log("Credit: " + movie.credits.totalCount);

      for (j = 0; j < movieObject.credits.edges.length; j++)
      {
        if (movieObject.credits.edges[j].node && movieObject.credits.edges[j].node.person)
        {
          movie.credits.edges[j] = {};
          movie.credits.edges[j].person = {};
          movie.credits.edges[j].person.firstName = movieObject.credits.edges[j].node.person.firstName;
          movie.credits.edges[j].person.lastName = movieObject.credits.edges[j].node.person.lastName;
          movie.credits.edges[j].activity = movieObject.credits.edges[j].node.position.name;
        }
      }
    }
  }
  
  // GENRES
  if (movieObject.genres && movieObject.genres.length > 0)
  {
    movie.genres = movieObject.genres;
    console.log(movie.genres);
  }
  
  // RUNTIME
  if (movieObject.runTime)
  {
    var tab = String(movieObject.runTime).split(":");   ///////// TO FONCTION CONVERT TIME FORMAT
    if (tab[0].startsWith("0")) {
      tab[0] = tab[0][1];
    }
    movie.runTime = tab[0] + " h " + tab[1];
    // console.log("runtime: " + movie.runTime);
  }
  
  // PRESS REVIEWS
  if (movieObject.stats && movieObject.stats.pressReview)
  {
    movie.pressReviews = {};
    if (movieObject.stats.pressReview.count)
    {
      movie.pressReviews.totalCount = movieObject.stats.pressReview.count;
    }
    if (movieObject.stats.pressReview.score)
    {
      movie.pressReviews.ratingScore = movieObject.stats.pressReview.score;
    }
    // console.log("Press rating: " + movie.pressReviews.ratingScore);
  }
  
  // USER REVIEWS
  if (movieObject.stats && movieObject.stats.userReview)
  {
    movie.userReviews = {};
    if (movieObject.stats.userReview.count)
    {
      movie.userReviews.totalCount = movieObject.stats.userReview.count;
    }
    if (movieObject.stats.userReview.score)
    {
      movie.userReviews.ratingScore = movieObject.stats.userReview.score;
    }
    // console.log("User rating: " + movie.userReviews.ratingScore);
  }
  
  // COUNTRIES
  if (movieObject.countries)
  {
    movie.countries = [];
    for (var m = 0; m < movieObject.countries.length; m++)
    {
      if (movieObject.countries[m].localizedName)
      {
        movie.countries[m] = movieObject.countries[m].localizedName;
        // console.log("Countries: " + movie.countries[m]);
      }
    }
  }
  
  return movie;
}

module.exports = {
  createMovie: createMovie
}

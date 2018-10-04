
function createShowtimesByTheater (theater, movie, movieShowtimes)
{
  console.log ("@ createShowtimesByTheater (theater, movieShowtimes)")
  // console.log (movieShowtimes);
  
  var showtimesByTheater = {};
  
  // -- THE THEATER
  if (theater)
  {
    showtimesByTheater.theater = {};
    showtimesByTheater.theater.name = theater.name;
    showtimesByTheater.theater.location = {};
    showtimesByTheater.theater.location.address = theater.location.address;
    showtimesByTheater.theater.location.zip = theater.location.zip;
    showtimesByTheater.theater.location.city = theater.location.city;
    showtimesByTheater.theater.loyaltyCards = theater.loyaltyCards;
  }
  console.log("- theater -");
  console.log(showtimesByTheater.theater);
  
  // -- THE MOVIESHOWTIMES IN THIS THEATER (a list)
  showtimesByTheater.movieShowtimes = [];
  
  for (var i = 0; i < movieShowtimes.edges.length; i++)
  {
    showtimesByTheater.movieShowtimes[i] = {};
    
    if (movieShowtimes.edges[i].node) // MovieShowtimes object
    {      
      // -- The movie of the i-th MovieShotime
      showtimesByTheater.movieShowtimes[i].movie = movie;
      console.log("- movie - " + i);
      console.log(showtimesByTheater.movieShowtimes[i].movie);
      
      // -- The showtimes of the i-th MovieShowtime
      showtimesByTheater.movieShowtimes[i].showtimes = [];
      for (var k = 0; k < movieShowtimes.edges[i].node.showtimes.length; k++)
      {
        showtimesByTheater.movieShowtimes[i].showtimes[k] = {};
        
        var tab = movieShowtimes.edges[i].node.showtimes[k].startsAt.split("T");
        var hour = tab[1].split(":");        // FUNCTION convert date format !!
        if (hour[0].startsWith("0")) {
          hour[0] = hour[0][1];
        }
        var startsAt = hour[0] + ":" + hour[1];
        
        showtimesByTheater.movieShowtimes[i].showtimes[k].startsAt = startsAt;
        showtimesByTheater.movieShowtimes[i].showtimes[k].format = movieShowtimes.edges[i].node.showtimes[k].format;
        showtimesByTheater.movieShowtimes[i].showtimes[k].version = movieShowtimes.edges[i].node.showtimes[k].version;
        showtimesByTheater.movieShowtimes[i].showtimes[k].ticketingURL = movieShowtimes.edges[i].node.showtimes[k].ticketingURL;
      }
      console.log("- showtimes -");
      console.log(showtimesByTheater.movieShowtimes[i].showtimes);
    }
  }
  
  console.log("- showtimesByTheater -");
  console.log(showtimesByTheater);
  
  return showtimesByTheater;
}

module.exports = {
  createShowtimesByTheater: createShowtimesByTheater
}
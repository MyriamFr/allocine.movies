
/* -------------------------------------------------------------------- */
/*                            MAIN FUNCTION                             */
/* -------------------------------------------------------------------- */

function selectMovie (searchMovieResults, selectIndex, movieTitle)
{  
  console.log ("@ SelectMovie()");
  console.log ("$ searchMovieResults: ");
  console.log (searchMovieResults);
  console.log ("$ selectIndex: " + selectIndex);
  console.log ("$ movieTitle: " + movieTitle);
  
  var selectMovieResults = {};
  selectMovieResults.searchMovieResults = searchMovieResults;
  selectMovieResults.selectIndex = selectIndex;
  
  //
  // TEST parameters validity: testQueryParams (below in this file)
  //
  selectMovieResults.resultStatus = testQueryParams (searchMovieResults, selectIndex, movieTitle);
  if (selectMovieResults.resultStatus != 100)
  {
    return selectMovieResults;
  }
  
  //
  // Populate the result of this query: a Movie
  //
  if (selectIndex == -1)  // "le dernier"
  {
    selectIndex = searchMovieResults.moviesConnection.totalCount - 1;
    selectMovieResults.movie = searchMovieResults.moviesConnection.movies[selectIndex];
  }
  else // "le n-ième"
  {
    selectIndex = selectIndex - 1;
    selectMovieResults.movie = searchMovieResults.moviesConnection.movies[selectIndex];
  }
  
  //   ------ TODO ------
  // Sélection avec MovieTitle (le titre d'un des films de la liste)
  // Pb si mal reconnu par l'ASR
  
  console.log (". selectIndex: " + selectMovieResults.selectIndex);
  console.log (". searchMovieResults:"); // la liste des films trouvés
  console.log (selectMovieResults.searchMovieResults)
  console.log (". movie:"); // le film choisi
  console.log (selectMovieResults.movie);
  
  return selectMovieResults;
}

module.exports = {
  function: selectMovie
}

/* -------------------------------------------------------------------- */
/*                        TEST QUERY PARAMS                             */
/* -------------------------------------------------------------------- */

function testQueryParams (searchMovieResults, selectIndex, movieTitle)
{
  console.log ("@ testQueryParams (searchMovieResults, selectIndex, movieTitle)");
  var resultStatus = -1;
  
  //
  // TEST -- The search movie action from the previous step wasn't successful.

  //
  if (searchMovieResults.moviesConnection == undefined ||
      searchMovieResults.moviesConnection == null ||
      searchMovieResults.moviesConnection.movies == undefined ||
      searchMovieResults.moviesConnection.movies == null ||
      searchMovieResults.moviesConnection.totalCount <= 0)
  {
    resultStatus = 400;
    console.log ("- SearchMovie action failed ? Yes!");
    console.log (". resultStatus: " + resultStatus);
    return resultStatus;
  }
  else { console.log("- SearchMovie action failed ? No: " + searchMovieResults.moviesConnection.totalCount + " movies found."); }
  
  //
  // TEST -- User didn't say which movie he/she want's to see.
  //
  if (selectIndex == undefined || selectIndex == null)
  {
    resultStatus = 300;
    console.log ("- SelectIndex UserSaid ? No!");
    console.log (". resultStatus: " + resultStatus);
    return resultStatus;
  }
  else { console.log ("- SelectIndex UserSaid ? Yes: " + selectIndex); }
  
  //
  // TEST -- User gave a select index higher than the number of results.
  //
  if (selectIndex > searchMovieResults.moviesConnection.movies.length)
  {
    resultStatus = 200;
    console.log ("- SelectIndex Valid ? No! " + selectIndex + " > " + searchMovieResults.moviesConnection.movies.length);
    console.log (". resultStatus: " + resultStatus);
    return resultStatus;
  }
  else { console.log ("- SelectIndex Valid ? Yes: " + selectIndex); }
  
  //
  // TEST -- Select index given by the user is valid.
  //
  var trueSelectIndex = selectIndex - 1;  // commence à 0 dans le code
  if (trueSelectIndex <= searchMovieResults.moviesConnection.movies.length)
  {
    resultStatus = 100;
    console.log ("- SelectIndex Valid ? Yes: " + selectIndex);
    console.log (". resultStatus: " + resultStatus);
  }
  
  return resultStatus;
}
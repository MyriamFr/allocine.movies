
var API = require("./api.js");

/*
 * Executes the API query 'search():searchResultsConnection'
 *
 * @param { movieTitle } title of a movie
 * @return { searchMovieResults } a SearchMovieResults, output of the current action
 */
function qsSearch (movieTitle, searchMovieResults)
{
  console.log("@ qsSearch (movieTitle, searchMovieResults)")
  
  movieTitle = encodeURI(movieTitle);
  
  var queryParams = "&query={search(first:100,text:%22" + movieTitle + "%22,types:[Movie]){totalCount,edges{node{node{id,__typename,stringValue}}}}}";
  
  var response = API.query(queryParams);
  var object = JSON.parse(response.responseText);
  var searchResultsConnection = object.data.search;
  
  if (response.status == 200)
  {
    // Match Yes (single || multi)
    if (searchResultsConnection.totalCount > 0) {
      searchMovieResults.resultStatus = 100;
    }
    // Match No
    else if (searchResultsConnection.totalCount == 0) {
      searchMovieResults.resultStatus = 0;  // 0 results
    }
    // API error
  } else {
    searchMovieResults.resultStatus = 400;  // API error
  }
  
  console.log("SearchStatus: " + searchMovieResults.resultStatus);
  console.log(searchResultsConnection);
  
  return searchResultsConnection;
}

module.exports = {
  qsSearch: qsSearch
}




/*
 * OUTPUT:
 *
 * searchResultsConnection {
 *   "data": {
 *     "search": {
 *       "totalCount": 68,
 *       "edges": [
 *       {
 *         "node": {
 *           "node": {
 *             "id": "TW92aWU6MTg1NDA4",
 *             "__typename": "Movie",
 *             "stringValue": "Harry Potter: Witchcraft Repackaged"
 *           }
 *         }
 *       }]
 *     }
 *   }
 * }
 */
 
 
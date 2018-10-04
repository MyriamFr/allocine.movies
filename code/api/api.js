
/*
 * Sends one query to the API with the given queryParams
 *
 * @param { queryParams } a JSON object with all parameters of the query
 */

function query (queryParams)
{
  console.log("@ query()");
  
  var apiURL = config.get("api-url");
  var apiAccessToken = config.get("api-access-token");
  var query = apiURL + "&token=" + apiAccessToken + queryParams;
  
  var options = {
    returnHeaders: true,
    // passAsJson: true,
    headers: {
      "Content-Type": "text/plain"
    }
  };
  
  console.log("- API URL: " + apiURL);
  console.log("- API ACCESS TOKEN: " + apiAccessToken);
  console.log("- QUERY PARAMS: " + queryParams);
  console.log("- OPTIONS:" + JSON.stringify(options));
  console.log("> QUERY: " + query);
  
  var response = http.postUrl(query, " ", options);
  
  console.log("- RESPONSE STATUS:" + response.status);
  console.log("- RESPONSE: " + response.parsed);
  
  return response;
}

module.exports = {
  query: query
}

var API = require("./api.js");

/*
 * Exceutes the API query: 'theaterList():TheaterConnection'
 *
 * @param { params } parameters of the query
 * @return { theaterList } a TheaterList
 */

function qsTheaterList (params)
{
  console.log("@ qsTheaterList (params)");
  
  // nombre de résultats limité à 3
  var queryParams = "&query={theaterList(first:3,search:%22" + params.theaterName + "%22,countries:FRANCE){totalCount,edges{node{id,name,loyaltyCards,fares{name,comment,prices{displayPrice,screens{name,handicapAccess}}},poster{path,publicationDate,url,data{copyright}},theaterCircuits{id,name,description,poster{path,publicationDate,url,data{copyright}}},location{address,zip,city,country,region}}}}}";
  
  var response = API.query(queryParams);  
  var object = JSON.parse(response.responseText);
  var theaterList = object.data.theaterList;
  console.log(theaterList);
  
  return theaterList;
}


module.exports = {
  qsTheaterList: qsTheaterList
}




//
// QUERY OUTPUT:
//

//   {"data":{"theaterList":{"totalCount":1,"edges":[{"node":{"id":"VGhlYXRlcjpDMDE2MQ==","name":"Gaumont Convention","loyaltyCards":["LePass","ChequeCinemaUniversel"],"fares":[{"name":"Etudiants","comment":"Coll\u00e9giens, Lyc\u00e9ens, Etudiants, sur pr\u00e9sentation d\u0027un justificatif","prices":[{"displayPrice":"8,70\u00a0\u20ac","screens":[]},{"displayPrice":"9,20\u00a0\u20ac","screens":[{"name":"Salle 1","handicapAccess":false},{"name":"Salle 2","handicapAccess":false},{"name":"Salle 3","handicapAccess":false},{"name":"Salle 4","handicapAccess":false} 
// ... 
// {"name":"Salle 4","handicapAccess":false},{"name":"Salle 5","handicapAccess":false},{"name":"Salle 6","handicapAccess":false},{"name":"Salle 7","handicapAccess":false},{"name":"Salle 8","handicapAccess":false},{"name":"Salle 9","handicapAccess":false}]},{"displayPrice":"4,00\u00a0\u20ac","screens":[]}]}],"poster":{"path":"\/cinemalogos\/2016\/03\/18\/152656314.jpg","publicationDate":"2000-11-14T13:49:00","url":"https:\/\/fr.web.img2.acsta.net\/cinemalogos\/2016\/03\/18\/152656314.jpg","data":{"copyright":null}},"theaterCircuits":{"id":"Q29tcGFueToxMDAwMg==","name":"Les Cin\u00e9mas Gaumont Path\u00e9","description":null,"poster":null},"location":{"address":"27, rue Alain-Chartier","zip":"75015","city":"Paris 15e arrondissement","country":"FRA","region":"\u00cele-de-France"}}}]}}}
$(document).ready(function() {

var search = "ritorno al futuro";

  $.ajax({
    "ulr": "https://api.themoviedb.org/3/search/movie",
    "data": {
      "api_key": "d1917066dde7a9b02484a9c4ced0c18e",
      "query": search,
    },
    "method": "GET",
    "success": function(data) {
      console.log(data);
    },
    "error": function(errore) {
      alert("errore");
    }
  })


  /*var film = {

  }


// Vado a inserire tutto nel tamplate e lo invio all'html
var source = $("#entry-template").html();
var template = Handlebars.compile(source);

var contenuto = template(day);

$(".gg-mm").append(contenuto);

*/





  // Fine codice
})

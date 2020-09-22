$(document).ready(function() {



$("#cerca").click(function() {
  var search = $("#ricercaFilm").val().toLowerCase();
  if (search != "") {
    console.log(search.length);
  } else {
    alert("titolo non trovato");
  }
  return search;
})


  $.ajax({
    "url": "https://api.themoviedb.org/3/search/movie",
    "data": {
      "api_key": "d1917066dde7a9b02484a9c4ced0c18e",
      "query": "ritorno al futuro",
      //"language": "it-IT"
    },
    "method": "GET",
    "success": function(data) {
      console.log(data);
      /*var data = data.results;
      filtroFilm(data);*/
    },
    "error": function(errore) {
      alert("errore");
    }
  })

/*
function filtroFilm(value) {
  for (i=0; i<=value.length; i++) {
      console.log(value[i]);

    var film = {
      "titolo": value[i].title,
      "titoloOriginale": value[i].original_title,
      "lingua": value[i].original_language,
      "valutazione": value[i].vote_average,
      // Classi css
      "previewFilm": "preview",
      "listaInfo": "lista"
    }

    // Stampo i risultati nel template
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var contenuto = template(film);

    $(".row").append(contenuto);
  }
}*/



  // Fine codice
})

$(document).ready(function() {

// Evento click su bottone 'cerca'
$("#cerca").click(function() {
  ricerca();
})

// Evento keypress su tasto 'invio'
$("#ricercaFilm").keypress(function(event) {
  if (event.which == 13) {
    ricerca();
  }
});

// Funzione di ricerca film e serie tv
function ricerca() {
  $(".row").text("");
var v = $(".valutazione").text();
var search = $("#ricercaFilm").val().toLowerCase();
  if (search != "" && isNaN(search)) {
    movies(search);
    series(search);
    voto(v);
  } else {
    alert("Il titolo inserito non è valido");
  }
  }

// Funzione colora stelle a seconda del voto
  function voto(num) {
   Math.round((num / 2));
   if (num = 5) {
     $(".s1, .s2, .s3, .s4, .s5").css({color: "yellow"});
   } else if ( num > 4) {
     $(".s1, .s2, .s3, .s4").css({color: "yellow"});
   } else if (num > 3) {
     $(".s1, .s2, .s3").css({color: "yellow"});
   } else if (num > 2) {
     $(".s1, .s2").css({color: "yellow"});
   } else if (num > 1) {
     $(".s1").css({color: "yellow"});
   }
  }


// API movies
function movies(element2) {
  $.ajax({
    "url": "https://api.themoviedb.org/3/search/movie",
    "data": {
      "api_key": "d1917066dde7a9b02484a9c4ced0c18e",
      "query": element2,
      //"language": "it-IT"
    },
    "method": "GET",
    "success": function(data) {
      console.log(data);
      var dataFilms = data.results;
      filtroFilm(dataFilms);
    },
    "error": function(errore) {
      alert("errore");
    }
  })
}

// API serie tv
function series(element) {
  $.ajax({
    "url": "https://api.themoviedb.org/3/search/tv",
    "data": {
      "api_key": "d1917066dde7a9b02484a9c4ced0c18e",
      "query": element,
      //"language": "it-IT"
    },
    "method": "GET",
    "success": function(data) {
      console.log(data);
      var dataSeries= data.results;
      filtroSeries(dataSeries);
    },
    "error": function(errore) {
      alert("errore");
    }
  })
}

// Template film
function filtroFilm(value) {
  for (i=0; i<=value.length; i++) {
      console.log(value[i]);

    var film = {
      "titolo": value[i].title,
      "titoloOriginale": value[i].original_title,
      "lingua": value[i].original_language,
      "valutazione": value[i].vote_average,
      //value[i].vote_average / 2,
      // Classi css
      "previewFilm": "preview",
      "listaInfo": "lista",
      "star": "stella",
      "voto": "votazione"
    }

    // Stampo i risultati nel template
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var contenuto = template(film);

    $(".row").append(contenuto);
    $("#ricercaFilm").val("");
  }
}


// Template serie tv
function filtroSeries(value2) {
  for (i=0; i<=value2.length; i++) {
      console.log(value2[i]);

    var serie = {
      "titolo": value2[i].name,
      "titoloOriginale": value2[i].original_name,
      "lingua": value2[i].original_language,
      "valutazione":
        value2[i].vote_average,

      // Classi css
      "previewFilm": "preview",
      "listaInfo": "lista",
      "star": "stella",
      "voto": "votazione",
    }

    // Stampo i risultati nel template
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var contenuto = template(serie);

    $(".row").append(contenuto);
    $("#ricercaFilm").val("");
    $(".preview").addClass("active");
  }
}



  // Fine codice
})

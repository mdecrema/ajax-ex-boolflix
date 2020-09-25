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
  var search = $("#ricercaFilm").val().toLowerCase();
    if (search != "" && isNaN(search)) {
      movies(search);
      series(search);
      $("#ricercaFilm").val("");
    } else {
      alert("Il titolo inserito non è valido");
      $("#ricercaFilm").val("");
    }
  }

// Funzione per abbreviare il titolo nel caso sia più lungo di 30 caratteri
  function title(titolo, num, type) {
    var add = "";
    if (type == "normale") {
      add = "...";
    } else if (type == "paragrafo") {
      add = "... <a href=''> continua a leggere</a>";
    } else {
      add;
    }

    var nuovoTesto = "";
    var lunParola = titolo.length;
      if (lunParola >= num) {
        for (var i = 0; i<num; i++) {
        nuovoTesto += titolo[i];
      }
      return nuovoTesto+add;
    } else {
      nuovoTesto += titolo;
      return nuovoTesto;
    }
  }

// Funzione che stampa img copertina
function image(value, type) {
  var img = "";
  if (type == "copertina") {
    if (value == undefined) {
      img += "img/no_poster01.png";
    } else {
      img += "https://image.tmdb.org/t/p/w200/"+value;
    }
  } else if (type == "bandiera") {
    var flags = ["en", "it", "cs", "de", "es", "fr", "hu", "ja", "ko", "no", "pl", "pt", "sv", "tr"];
      if (flags.includes(value)) {
        img += "<img src='img/"+value+".svg' alt=''/>";
      } else {
        img += "<span>"+value+"</span>";
      }
    }
  return img;
}

// Funzione immette la bandiera corrispondente alla nazione della lingua orginale
  /*function flag(lingua) {
    var img = "";
    var flags = ["en", "it", "cs", "de", "es", "fr", "hu", "ja", "ko", "no", "pl", "pt", "sv", "tr"];
    if (flags.includes(lingua)) {
      img += "<img src='img/"+lingua+".svg' alt=''/>";
  } else {
    img += "<span>"+lingua+"</span>";
  }
  return img;
} */

// Funzione colora stelle a seconda del voto
  function voto(num) {
   var num = Math.round(num / 2);
   var stars= "";
   for (var i=1; i<=5; i++) {
     if (i<=num) {
       var star = '<i class="fas fa-star"></i>';
     } else {
       var star = '<i class="far fa-star"></i>';
     }
     stars += star;
   }
   return stars;
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
      console.log(dataFilms);
      var dataFilms = data.results;
      filtroRisultati("film", dataFilms);
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
      //console.log(data);
      var dataSeries= data.results;
      filtroRisultati("serie", dataSeries);
    },
    "error": function(errore) {
      alert("errore");
    }
  })
}

// Template film
function filtroRisultati(type, value) {
  for (i=0; i<=value.length; i++) {
      console.log(value[i]);

      var average = value[i].vote_average;
      var language = value[i].original_language;

      var titolo;
      var release;

      if (type == "film") {
        titolo = value[i].title;
        titoloOriginale = value[i].original_title;
        release = value[i].release_date;
      } else if (type == "serie") {
        titolo = value[i].name
        titoloOriginale = value[i].original_name;
        release = value[i].first_air_date;
      }

    var film = {
      "titolo": title(titolo, 30, "normale"),
      "titoloOriginale": title(titoloOriginale, 30),
      "img-cop": image(value[i].poster_path, "copertina"),
      "img-band": image(language, "bandiera"),
      "lingua": value[i].original_language,
      "valutazione": value[i].vote_average,
      "star": voto(average),
      "data": title(release, 4, "anno"),
      "overview": title(value[i].overview, 300, "paragrafo"),
      // Classi css
      "previewFilm": "preview",
      "listaInfo": "lista",
      "bandiera": "flag",
      "informazioni": "info"
    }

    // Stampo i risultati nel template
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    var contenuto = template(film);

    $(".row").append(contenuto);
  }
}

// Animazione menu
$(".nav_bar").mouseenter(function() {
  apriMenu();
})

$(".box").mouseout(function() {
  chiudiMenu();
})

function apriMenu() {
  var counter = 0;
  setInterval(function() {
    if (counter == 70) {
      clearInterval();
    } else {
      counter++;
      $(".menu").css({marginTop: counter+"px"});
      $(".nav_bar").css({borderBottom: "2px solid darkgrey"});
  }
}, 5);
}

function chiudiMenu() {
  $(".menu").css({marginTop: "0px"});
  $(".nav_bar").css({borderBottom: "8px solid #5A0505"});
}

  // Fine codice
})

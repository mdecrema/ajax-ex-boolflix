$(document).ready(function() {
animation();
$(".freccina").click(function() {
  menuProfilo("apri");
})
$(".logoProfilo").click(function() {
  menuProfilo("apri");
})
$(".film-wrapper").click(function() {
  menuProfilo("chiudi");
})

// Evento click su bottone 'cerca'
$("#cerca").click(function() {
  ricerca();
  menuProfilo("chiudi");
})

// Evento keypress su tasto 'invio'
$("#ricercaFilm").keypress(function(event) {
  if (event.which == 13) {
    ricerca();
    menuProfilo("chiudi");
  }
});

// Funzione di ricerca film e serie tv
function ricerca() {
  $(".row").text("");
  var search = $("#ricercaFilm").val().toLowerCase();
  var radioValue = $("input[name='tipo']:checked").val();
  var genere = "";
    if (search != "" && isNaN(search)) {
      //movies(search);
      //series(search);
        //console.log(radioValue);
        if (radioValue == 0) {
          movies(search);
          genere = "Film";
        } else if (radioValue == 1) {
          series(search);
          genere = "Serie tv";
        } else if (radioValue == 2) {
          movies(search);
          series(search);
          genere = "All results";
        }
      $("#ricercaFilm").val("");
      $(".login").fadeOut();
      changeTitle(genere);
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
      console.log(data);
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
      var titoloOriginale;

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
      "titoloOriginale": title(titoloOriginale, 30, "normale"),
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

// Funzione cambia titolo principale
function changeTitle(genere) {
  var titolo = $(".titolo h1");
  return titolo.text(genere);
}

// Menu profilo
function menuProfilo(stato) {
  if (stato == "apri") {
    $(".menu_arrow").removeClass("hidden");
  } else if (stato == "chiudi") {
    $(".menu_arrow").addClass("hidden");
  }
}

// Animazione menu
$(".nav_bar").mouseenter(function() {
  apriMenu();
})

$(".film-wrapper").mouseenter(function() {
  chiudiMenu();
})

// Funzione apertuta menu
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

// Funzione chiusura menu
function chiudiMenu() {
  $(".menu").css({marginTop: "0px"});
  $(".nav_bar").css({borderBottom: "8px solid #5A0505"});
}

// Funzione animazione apertura pagina
function animation() {
  switchOn();
  switchOff();
}

// Funzione incremento opacità
function letteraOn(lettera) {
  var classe = $("."+lettera);
  var counter1 = 0;
  setInterval(function() {
  if (counter1 == 9) {
    clearInterval();
  } else {
    counter1 ++;
  classe.css({opacity: "0."+counter1});
}
}, 200);
}

// Funzione decremento opactià
function letteraOff(lettera) {
  var classe = $("."+lettera);
  var counter2 = 9;
  setInterval(function() {
  if (counter2 == 0) {
    clearInterval();
  } else {
    counter2 --;
  classe.css({opacity: "0."+counter2});
}
}, 150);
}

// TimeOut in entrata
function switchOn() {
  setTimeout(function() {
    letteraOn("n");
  }, 1500);
  setTimeout(function() {
    letteraOn("e");
  }, 1800);
  setTimeout(function() {
    letteraOn("t");
  }, 2100);
  setTimeout(function() {
    letteraOn("f");
  }, 2400);
  setTimeout(function() {
    letteraOn("l");
  }, 2700);
  setTimeout(function() {
    letteraOn("i");
  }, 3000);
  setTimeout(function() {
    letteraOn("x");
  }, 3300);
}

// TimeOut in uscita
function switchOff() {
  setTimeout(function() {
    letteraOff("n");
  }, 5200);
  setTimeout(function() {
    letteraOff("e");
  }, 5400);
  setTimeout(function() {
    letteraOff("t");
  }, 5600);
  setTimeout(function() {
    letteraOff("f");
  }, 5800);
  setTimeout(function() {
    letteraOff("l");
  }, 6000);
  setTimeout(function() {
    letteraOff("i");
  }, 6200);
  setTimeout(function() {
    letteraOff("x");
  }, 6400);
  setTimeout(function() {
    $(".login").removeClass("hidden");
  }, 8000);
}

  // Fine codice
})

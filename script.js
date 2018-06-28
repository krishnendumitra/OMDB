$(document).ready(() => {
  $("#movieDetails").hide();
  // TODO
  $("#loaderElement").hide();

  $("#searchBtn").on("click", () => {
    clickEvent();
  });
  $("#searchForm").on("submit", e => {
    clickEvent();
    e.preventDefault();
  });
});
let dummyPic = "http://via.placeholder.com/350x350";

let clickEvent = () => {
  let searchText = $("#searchText").val();
  console.log(searchText);

  if ($("#byName").prop("checked")) {
    if (searchText == "") {
      alert("Please enter movie name");
      return;
    }
    getMoviesByText(searchText);
  } else if ($("#byIMDBId").prop("checked")) {
    if (searchText == "") {
      alert("Please enter iMDB id");
      return;
    }
    getMoviesById(searchText);
  }
};

let getMoviesByText = searchText => {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: `http://www.omdbapi.com/?apikey=883b3010&t=${searchText}`,
    success: response => {
      console.log(response);
      if (response.Response == "True") {
        $("#moviePoster").html(`
        <div id="moviePoster" class="col-sm-12 col-lg-4 col-xs-12 col-md-4 text-center animated sildeInLeft"></div><img src=${
          response.Poster
        } class="image"/>`);
        setValuesInDom(response);
        if (response.Poster == "N/A") {
          $("#moviePoster").html(`
          <div id="moviePoster" class="col-sm-12 col-lg-4 col-xs-12 col-md-4 text-center animated sildeInLeft"></div><img src=${dummyPic} class="image"/>`);
        }
      } else {
        alert("No movies found....");
        $("#moviePoster").html(`
        <div id="moviePoster" class="col-sm-12 col-lg-4 col-xs-12 col-md-4 text-center animated sildeInLeft"></div><img src=${dummyPic} class="image"/>`);
      }
    },
    beforeSend: function() {
      resetValue();
      $("#loaderElement").show();
    },

    complete: function() {
      $("#movieDetails").show();
      $("#loaderElement").hide();
    },
    error: function(request, errorType, errorMessage) {
      $("#loaderElement").hide();
      console.log(request);
      console.log(errorType);
      alert("Something Wrong Happened");
    },

    timeout: 30000 // in ms
  });
};

let getMoviesById = searchText => {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: `http://www.omdbapi.com/?apikey=883b3010&i=${searchText}`,
    success: response => {
      if (response.Response == "True") {
        $("#moviePoster").html(`<img src=${response.Poster} class="image"/>`);
        setValuesInDom(response);
        if (response.Poster == "N/A") {
          $("#moviePoster").html(`<img src=${dummyPic} class="image"/>`);
        }
      } else {
        alert("No movies found....");
        $("#moviePoster").html(`<img src=${dummyPic} class="image"/>`);
      }
    },
    beforeSend: function() {
      resetValue();
      $("#loaderElement").show();
    },

    complete: function() {
      $("#movieDetails").show();
      $("#loaderElement").hide();
    },
    error: function(request, errorType, errorMessage) {
      $("#loaderElement").hide();
      console.log(request);
      console.log(errorType);

      alert("Something Wrong Happened");
    },

    timeout: 30000 // in ms
  });
};

let setValuesInDom = response => {
  $("#title").html(`<h3>${response.Title}</h3>`);

  $("#release").html(response.Released);

  $("#director").html(response.Director);

  $("#imdbRating").html(response.imdbRating);

  $("#imdbId").html(response.imdbID);

  $("#awards").html(response.Awards);

  setDOMfromArray(response.Actors, "actor");

  setDOMfromArray(response.Language, "language");

  setDOMfromArray(response.Genre, "genre");

  for (const iterator of response.Ratings) {
    if (iterator.Source == "Internet Movie Database") {
      console.log(iterator.Value);

      $("#imdb").html(iterator.Value);
    }
    if (iterator.Source == "Rotten Tomatoes") {
      $("#rottenTomatoes").html(iterator.Value);
    }
    if (iterator.Source == "Metacritic") {
      $("#metaCritic").html(iterator.Value);
    }
  }

  $("#Country").html(response.Country);

  $("#Runtime").html(response.Runtime);

  $("#Writer").html(response.Writer);

  $("#Metascore").html(response.Metascore);

  $("#Plot").html(response.Plot);

  $("#Rated").html(response.Rated);

  $("#Type").html(response.Type);

  $("#Year").html(response.Year);

  $("#imdbVotes").html(response.imdbVotes);
  if (response.totalSeasons) {
    $("#totalSeasons").html(response.totalSeasons);
  } else {
    $("#totalSeasons").html("N/A");
  }
};

let resetValue = () => {
  $("#moviePoster").html('<img src="' + dummyPic + '" class="image"/>');

  $("#title").html("");

  $("#release").html("");

  $("#director").html("");

  $("#imdb").html("");

  $("#imdbId").html("");

  $("#awards").html("");

  $("#production").html("");
};

let setDOMfromArray = (array, element) => {
  let listOfActors = "";
  for (const iterator of array) {
    listOfActors += iterator;
  }

  $(`#${element}`).html(listOfActors);
};

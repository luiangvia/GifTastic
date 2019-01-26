var topics = ["Connor McGregor", "Daniel Cormier", "Jon Jones", "Khabib Nurmagomedov", "Max Holloway ", "Georges St-Pierre", "Ronda Rousey", "Miesha Tate", "Anderson Silva", "Chuck Liddell", "Cris Cyborg"];
var fighterBtn;
var fighterImage;
var rating;

function renderButtons() {

  $("#buttons").empty();

  $("#fighter-input").val("");

  for (var i = 0; i < topics.length; i++) {

    var fighterBtn = $("<button>");

    fighterBtn.addClass("fighter-btn");

    fighterBtn.attr("data-fighter", topics[i]);

    fighterBtn.text(topics[i]);


    $("#buttons").append(fighterBtn);

    console.log(topics[i]);
  }
}

function displayImages() {

  $("#gifs-appear-here").empty();
  $(".item").empty();

  var ufc = $(this).attr("data-fighter");
  console.log("this: " + this);
  console.log("fighter: " + ufc);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ufc + "&api_key=lCceD439DJtScZq5DWnGk1sN70eeiFea";

  $.ajax({
      url: queryURL,
      method: "GET"
    })

    .done(function (response) {

      console.log(response);
      var results = response.data;

      var x = 15;

      for (var i = 0; i < x; i++) {
        console.log("results.length: " + results.length);

        var gifDiv = $("<div class='item float-left'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var fighterImage = $("<img>");

        fighterImage.attr("src", results[i].images.fixed_height_still.url);

        fighterImage.attr("data-state", "still");

        fighterImage.attr("data-still", results[i].images.fixed_height_still.url);

        fighterImage.attr("data-animate", results[i].images.fixed_height.url);

        fighterImage.addClass("gif");

        gifDiv.prepend(fighterImage);

        gifDiv.prepend(p);

        $("#gifs-appear-here").prepend(gifDiv);

      }

      $(".gif").on("click", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });

}

$("#add-fighter").on("click", function (event) {

  event.preventDefault();

  var newTopic = $("#fighter-input").val().trim();

  topics.push(newTopic);

  renderButtons();

});

renderButtons();

$(document).on("click", ".fighter-btn", displayImages);
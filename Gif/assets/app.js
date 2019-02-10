//create variable named topics to contain string of arrays
var topics = ["Connor McGregor", "Daniel Cormier", "Jon Jones", "Khabib Nurmagomedov", "Max Holloway ", "Georges St-Pierre", "Ronda Rousey", "Miesha Tate", "Anderson Silva", "Chuck Liddell", "Cris Cyborg"];
var fighterBtn;
var fighterImage;
var rating;

function renderButtons() {
  //want to pull from variable

  //empty the buttons so they do not add all after another tab is added
  $("#buttons").empty();

  //empty the box of previously added fighters
  $("#fighter-input").val("");

  //create a for-loop to iterate through the topics array
  for (var i = 0; i < topics.length; i++) {
    //create a variable equal to button
    var fighterBtn = $("<button>");

    //give each fighter button its class
    fighterBtn.addClass("fighter-btn");

    //then give each fighter-btn a data-attribute called data-fighter
    fighterBtn.attr("data-fighter", topics[i]);

    //then give each fighterbtn text equal to its name
    fighterBtn.text(topics[i]);

    //then append each fighterBtn to the buttons div
    $("#buttons").append(fighterBtn);

    console.log(topics[i]);
  }
}

//this function displays images of the fighters chosen by user and is activated when user clicks fighter-btn
function displayImages() {
  //clear previous images that have been displayed
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
      //
      var results = response.data;

      //x is how many total gifs we want to go to the browser
      var x = 15;

      for (var i = 0; i < x; i++) {
        console.log("results.length: " + results.length);
        //create variable with a div to put image and rating in
        var gifDiv = $("<div class='item float-left'>");

        //variable created to hold rating of specific gif
        var rating = results[i].rating;

        //put rating on html in paragraph
        var p = $("<p>").text("Rating: " + rating);

        //create variable called fighterImage and put into image element
        var fighterImage = $("<img>");

        //give fighterImage src and image information
        fighterImage.attr("src", results[i].images.fixed_height_still.url);

        //give fighterImage data-state information to allow image to be in still state
        fighterImage.attr("data-state", "still");

        //give fighterImage data-still image information to allow image to be in still state
        fighterImage.attr("data-still", results[i].images.fixed_height_still.url);

        //give fighterImage data-animate image information so when clicked it will play gif
        fighterImage.attr("data-animate", results[i].images.fixed_height.url);

        //add a class to fighterImage
        fighterImage.addClass("gif");


        //for each image/paragraph prepend to div 
        gifDiv.prepend(fighterImage);
        gifDiv.prepend(p);


        //put image and image div on browser
        $("#gifs-appear-here").prepend(gifDiv);

      }

      //click function on gif to allow user to play the gif
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


//this allows user to add new fighters to list
$("#add-fighter").on("click", function (event) {
  //event.preventDefault() prevents the form from trying to submit itself
  //form used so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  //grab the text from the input box and trim any extra spaces entered
  var newTopic = $("#fighter-input").val().trim();

  //takes fighter entered from the textbox and adds it to our array of topics
  topics.push(newTopic);

  // call renderButtons which handles the processing of topics
  renderButtons();

});

//renderButtons function called to display the initial list of fighter
renderButtons();

// click event on the fighter-btn to listen for which fighter user pics
$(document).on("click", ".fighter-btn", displayImages);
$( document ).ready(function() {
  console.log( "ready!" );

//variables
var topics = ["basic", "rainbow", "titus", "zach morris", "sprinkles"];


//functions
function displayGif() {
  $(document).on("click", ".topic", function () {
    $("#gif-holder").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response){
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class = 'item'>");
        var rating = results.rating;
        var p = $("<p>").text("Rating: " +rating)
        var image = $("<img>");
        image.attr("src",results[i].images.fixed_height.url);
        image.addClass("gif");
        gifDiv.append(p);
        gifDiv.append(image);

        $("#gif-holder").prepend(gifDiv);
      }
    });

  });

};


function renderButtons() {

  $("#button-holder").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each topic in the array
          var a = $("<button>");
          // Adding classes for topics and bootstrap styline
          a.addClass("topic");
          a.addClass("btn");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#button-holder").append(a);
        }
};

      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();

        // Adding topic from the textbox to the topics array
        topics.push(topic);

        // Calling renderButtons to add the button to the existing buttons array
        renderButtons();
      });

      // $(document).on("click", ".topic", displayGif);


      renderButtons();
      displayGif();


    });
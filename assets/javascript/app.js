
var tvShows = ["friends", "seinfeld", "saved by the bell", "golden girls","cheers","game of thrones","law and order","arrested development","lost",
"simpsons"];

function renderButtons() {
    $("#button-area").empty();
    // Loop through the array of tv shows, then generate buttons for each show
    for (var i=0; i<tvShows.length; i++) {
        var newButton = $("<button>");
        var buttonText = buttonName(tvShows[i]);
        newButton.attr("type","button")
            .attr("data-name",buttonText)
            .addClass("btn btn-secondary m-2 tv-show")
            .text(buttonText);
        $("#button-area").append(newButton);
    };
}

function buttonName(myString) {
    myString = myString.toLowerCase()
        .split(' ')
        .map(function(s) { 
            return s.charAt(0).toUpperCase() + s.substring(1)
        })
        .join(' ');
    return myString;
}

function checkTvArray(userText) {
    var lowerCaseTVShows = tvShows.map(function(text) {
        return text.toLowerCase();
      });
    return lowerCaseTVShows.includes(userText.toLowerCase());      
}

function displayTVInfo (){
    var title = $(this).attr("data-name");
    var url = "https://api.giphy.com/v1/gifs/search";
    var searchParams = {
      'api_key': "RFm8SxxwxUy8uSVlgyzAFtnNz5ncHf13",
      'q': "tv " +title,
      'limit': 100,
      'lang':'en'
    }
    url += '?' + $.param(searchParams);

    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            var showDiv = $("<div>")
                .addClass("d-inline-flex");
            var newP = $("<p>")
                .text("Rating: "+results[i].rating.toUpperCase())
                .addClass("m-2");
            var showImage = $("<img>");
            var stillURL = results[i].images.fixed_height_still.url;
            showImage.attr("src", stillURL)
                .attr("data-still",stillURL)
                .attr("data-animate",results[i].images.fixed_height.url)
                .attr("data-state","still")
                .addClass("gif img-fluid");
            showDiv.append(newP);
            showDiv.append(showImage);
            $("#gify-area").prepend(showDiv);
        }
    });
}

function animateGIF () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src",$(this).attr("data-animate"));
      $(this).attr("data-state","animate");
    } else {
      $(this).attr("src",$(this).attr("data-still"));
      $(this).attr("data-state","still");
    }
}


$("#tv-submit").on("click", function(event) {
    event.preventDefault();
    var userText = $("#tv-input").val();
    if (!checkTvArray(userText)){
        tvShows.push(buttonName(userText));
    }
    renderButtons();
    $("#tv-input").val("");
});

$(document).on("click", ".tv-show", displayTVInfo);

$(document).on("click",".gif", animateGIF);

$(document).ready(function() {
    renderButtons();

});
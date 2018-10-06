
var tvShows = ["friends", "seinfeld", "saved by the bell", "golden girls","cheers","game of thrones","law and order","arrested development","lost",
"simpsons"];

function renderButtons() {
    $("#button-area").empty();
    // Loop through the array of tv shows, then generate buttons for each show
    for (var i=0; i<tvShows.length; i++) {
        var newButton = $("<button>");
        newButton.attr("type","button")
            .addClass("btn btn-secondary m-2")
            .text(buttonName(tvShows[i]));
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

$("#tv-submit").on("click", function(event) {
    event.preventDefault();
    var userText = $("#tv-input").val();
    if (!checkTvArray(userText)){
        tvShows.push(buttonName(userText));
    }
    renderButtons();
    $("#tv-input").val("");
});


$(document).ready(function() {
    renderButtons();

});
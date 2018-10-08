
var tvShows = ["friends", "seinfeld", "saved by the bell", "golden girls","gilmore girls","game of thrones","law and order","arrested development","lost",
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

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function createRandomArray (results) {
    var randomGIFs = [];
    var randomIndex = [];
    var randNum;
    var j=false;
    for (var i=0; i<10;i++) {
        while (j === false) {
            randNum = getRandomNumber(0,results.length);
            //console.log(randNum);
            if (randomIndex.includes(randNum)===false) {
                randomGIFs.push(results[randNum]);
                randomIndex.push(randNum);
                j = true;
            }
        }   
        j=false;
    }
    return randomGIFs;
}


function displayTVInfo (){
    $("#results-header").show();
    var title = $(this).attr("data-name");
    var noSpaceTitle = title.replace(/\s/g,'');
    var url = "https://api.giphy.com/v1/gifs/search";
    var searchParams = {
      'api_key': "RFm8SxxwxUy8uSVlgyzAFtnNz5ncHf13",
      'q': "tv " +title,
      'limit': 50,
      'lang':'en'
    }
    url += '?' + $.param(searchParams);

    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        var results = createRandomArray(response.data);
        for (var i = 0; i < results.length; i++) {
            var showDiv = $("<div>")
                .addClass("d-inline-block m-2");
            var newP = $("<p>")
                .text("Rating: "+results[i].rating.toUpperCase())
                .addClass("mt-2 mr-2 mb-2");
            var showImage = $("<img>");
            var stillURL = results[i].images.fixed_height_still.url;
            showImage.attr("src", stillURL)
                .attr("data-still",stillURL)
                .attr("data-animate",results[i].images.fixed_height.url)
                .attr("data-state","still")
                .attr("data-name",noSpaceTitle+i)
                .addClass("gif img-fluid");
            var favButton = $("<button>")
                .text("Save GIF")
                .attr("type","button")
                .attr("data-img-name",noSpaceTitle+i)
                .addClass("btn btn-info m-1 btn-sm favorite")
            showDiv.append(newP);
            showDiv.append(showImage);
            showDiv.append(favButton);
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

function makeFavorite(){
    if ($(".favorites-area").children().length -1 === 0){
        $("#saved-header").show();
    }
    var saveDiv = $("<div>")
        .addClass("d-inline-block m-2");
    var imgName = $(this).attr("data-img-name");
    var newGIF = $("[data-name="+imgName+"]").clone()
        .addClass("m-2");
    var removeButton = $("<button>")
        .text("Unsave GIF")
        .attr("type","button")
        .attr("data-img-name",imgName)
        .addClass("btn btn-info m-1 btn-sm remove")
    saveDiv.append(newGIF);
    saveDiv.append(removeButton);
    saveDiv.appendTo( ".favorites-area" );
}

function removeFavorite(){

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

$(document).on("click",".favorite",makeFavorite);

$(document).ready(function() {
    renderButtons();

});
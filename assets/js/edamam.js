// JavaScript file for Edamam API
var endpoint = "https://api.edamam.com/search";
var apiKey = "dce91a1b6d878956479351767c573add";
var appID = "36d96c48";

// Array for health labels
var healthLabels = ["vegan", "vegetarian", "sugar-conscious", "peanut-free", "tree-nut-free", "alcohol-free"];

// Array for favorited recipes
var favoriteRecipes = [];

if (localStorage.getItem("favoriteRecipe")){
    favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipe"));
};

// For-loop for health-labels
for (var i = 0; i < healthLabels.length; i++) {

    // // Sets values of health label checkboxes to unchecked by default when page is loaded
    $("#" + healthLabels[i]).val("no");

    // // When checkbox is clicked...
    $("#" + healthLabels[i]).click(function(e){

        // If box is unchecked, check it!
        if ($("#" + e.target.id).val() == "no") {
            $("#" + e.target.id).val("yes");
        }

        // If it's checked, uncheck it!
        else if ($("#" + e.target.id).val() == "yes") {
            $("#" + e.target.id).val("no");
        }  
    });
};

// Function for calling API
function apiCall(apiURL, apiParameters, apiEnd){
    
    // For-loop for health-labels
    for (var i = 0; i < healthLabels.length; i++) {

        // If checkbox is checked...
        if ($("#" + healthLabels[i]).val() == "yes") {
            // Add that filter to API parameters
            apiParameters = apiParameters + "&health=" + healthLabels[i];
        };
    };
 
    console.log(apiParameters);

    // Updates API URL to include all necessary parts
    apiURL = apiURL + apiParameters + apiEnd;

    // Fetch call for Edamam API
    fetch(apiURL)

    .then(function (response) {
        return response.json();
    })

    .then(function (data){
        // Logs result of API call in console
        console.log(data);

        // Saves API parameters & data in local storage
        localStorage.setItem(apiParameters, JSON.stringify(data));

        // Populates table with recipes & thumbnail images
        for (var i = 0; i < data.hits.length; i++){
            var tableRow = $("<div>");
            var link = $("<a>").attr("href", data.hits[i].recipe.url).text(data.hits[i].recipe.label);
            var thumbnail = $("<img>").attr("src", data.hits[i].recipe.image).attr("alt", "Photo of " + data.hits[i].recipe.label).addClass("thumbnail");
            var favoriteBtn = $("<button>").addClass("favoriteBtn")

            tableRow.append(thumbnail, link, favoriteBtn);
            $("#recipes-table").append(tableRow);
        };

        // When "favorite" button is clicked
        $(".favoriteBtn").click(function(event){
            // Saves favorited recipe's title & URL as an object in the global array of favorited recipes
            var newFavorite = {
                title: event.target.previousElementSibling.text,
                link: event.target.previousElementSibling.href
            };

            favoriteRecipes.push(newFavorite);
            
            // Saves favorited recipe's info in local storage
            localStorage.setItem("favoriteRecipe", JSON.stringify(favoriteRecipes));
        });
    });
};

// When the "find recipes" button is clicked...
$("#recipes-button").click(function(event){

    // Prevents defaulting
    event.preventDefault();

    // Clears out recipe table
    $("#recipes-table").empty();

    // Starting point of API call URL
    var apiURL = endpoint;

    // Parameter section for API URL
    var apiParameters = "?q=";

    // Finishes API URL with app ID & key
    var apiEnd = "&app_id=" + appID + "&app_key=" + apiKey;

    // Sets max number of results returned
    var numberResults = $("#numberResults").val();

    // As long as number of results input is not blank...
    if (numberResults !== "") {

        // Sets ingredient keyword
        var ingKeyword = $("#searchBar").val();

        // Updates API parameters section to include ingredient keyword
        apiParameters = apiParameters + ingKeyword;

        // Updates API parameters section to include number of results
        apiParameters = apiParameters + "&from=0&to=" + numberResults;
        
        // Calls Edamam API
        apiCall(apiURL, apiParameters, apiEnd);
    }
    
    // Otherwise, displays an error message
    else {
        var errorMessage = $("<h4>").attr("id", "errorMessage").text("Please choose how many results you would like");
        $("#userInputs").append(errorMessage);
    };
});

// When "load favorite recipes" button is clicked...
$("#load-favorites").click(function(){

    // For each item in the "favorite recipes" array...
    for (var i = 0; i < favoriteRecipes.length; i++) {
    
        // Add an item to the list with a link to the favorited recipe
        var favoritedItem = $("<li>").append($("<a>").addClass("favorited-items").text(favoriteRecipes[i].title).attr("href", favoriteRecipes[i].link));
        $("#favorites-list").append(favoritedItem);
    };
});
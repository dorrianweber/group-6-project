// JavaScript file for Edamam API
var endpoint = "https://api.edamam.com/search";
var apiKey = "dce91a1b6d878956479351767c573add";
var appID = "36d96c48";

// Sets values of health label checkboxes to unchecked by default when page is loaded
$("#vegan").val("no");
$("#vegetarian").val("no");
$("#sugar-conscious").val("no");
$("#peanut-free").val("no");
$("#tree-nut-free").val("no");
$("#alcohol-free").val("no");

// Sets values of diet label checkboxes to unchecked by default when page is loaded
$("#high-protein").val("no");
$("#low-fat").val("no");
$("#low-carb").val("no");

// When "peanut free" checkbox is clicked...
$("#peanut-free").click(function(e){
    
    // (Preventing bubbling to other checkboxes)
    if (e.target.id == "peanut-free") {
      
        // If box is unchecked, check it!
        if ($("#peanut-free").val() == "no") {
            $("#peanut-free").val("yes");
        }

        // If it's checked, uncheck it!
        else if ($("#peanut-free").val() == "yes") {
            $("#peanut-free").val("no");
        }  
    };
});

// Function for calling API
function apiCall(apiURL, apiParameters, apiEnd){
    
    // If "peanut free" checkbox is checked...
    if ($("#peanut-free").val() == "yes") {
        // Add that filter to API parameters
        apiParameters = apiParameters + "&health=peanut-free";
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

        // Populates table with recipes & thumbnail images
        for (var i = 0; i < data.hits.length; i++){
            var tableRow = $("<tr>");
            var tableData = $("<td>");
            var link = $("<a>").attr("href", data.hits[i].recipe.url).text(data.hits[i].recipe.label);
            var thumbnail = $("<img>").attr("src", data.hits[i].recipe.image).attr("alt", "Photo of " + data.hits[i].recipe.label).addClass("thumbnail");

            tableData.append(thumbnail);
            tableData.append(link);
            tableRow.append(tableData);
            $("#recipes-table").append(tableRow);
        };
    });

};

// When the "find recipes" button is clicked...
$("#recipes-button").click(function(){
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
// JavaScript file for Edamam API
var endpoint = "https://api.edamam.com/search";
var apiKey = "dce91a1b6d878956479351767c573add";
var appID = "36d96c48";

// Sets values of allergen checkboxs to unchecked by default when page is loaded
$("#glutenFree").val("no");
$("#dairyFree").val("no");
$("#peanutFree").val("no");

// When "gluten free" checkbox is clicked...
$("#glutenFree").click(function(e){
    
    // (Preventing bubbling to other checkboxes)
    if (e.target.id == "glutenFree") {
      
        // If box is unchecked, check it!
        if ($("#glutenFree").val() == "no") {
            $("#glutenFree").val("yes");
        }

        // If it's checked, uncheck it!
        else if ($("#glutenFree").val() == "yes") {
            $("#glutenFree").val("no");
        }  
    };
});

// When "dairy free" checkbox is clicked...
$("#dairyFree").click(function(e){
    
    // (Preventing bubbling to other checkboxes)
    if (e.target.id == "dairyFree") {
      
        // If box is unchecked, check it!
        if ($("#dairyFree").val() == "no") {
            $("#dairyFree").val("yes");
        }

        // If it's checked, uncheck it!
        else if ($("#dairyFree").val() == "yes") {
            $("#dairyFree").val("no");
        }  
    };
});

// When "peanut free" checkbox is clicked...
$("#peanutFree").click(function(e){
    
    // (Preventing bubbling to other checkboxes)
    if (e.target.id == "peanutFree") {
      
        // If box is unchecked, check it!
        if ($("#peanutFree").val() == "no") {
            $("#peanutFree").val("yes");
        }

        // If it's checked, uncheck it!
        else if ($("#peanutFree").val() == "yes") {
            $("#peanutFree").val("no");
        }  
    };
});

// Function for calling API
function apiCall(apiURL, apiParameters, apiEnd){
    
    // If "gluten free" checkbox is checked...
    if ($("#glutenFree").val() == "yes") {
        // Add that filter to API parameters
        apiParameters = apiParameters + "&gluten-free";
    };

    // If "dairy free" checkbox is checked...
    if ($("#dairyFree").val() == "yes") {
        // Add that filter to API parameters
        apiParameters = apiParameters + "&dairy-free";
    };

    // If "peanut free" checkbox is checked...
    if ($("#peanutFree").val() == "yes") {
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

    // Working on gluten free option...
    console.log($("#glutenFree").val());

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
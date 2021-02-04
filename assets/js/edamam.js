// JavaScript file for Edamam API
var endpoint = "https://api.edamam.com/search";
var apiKey = "dce91a1b6d878956479351767c573add";

numberResults = 0;
calMin = 0;
calMax = 4000;

// URL to work w/
// + "&from=0&to=" + numberResults + "&calories=" + calMin + "-" + calMax + "&health=alcohol-free"

function apiCall(){
    // Sets ingredient keyword to whatever is in the search bar
    var ingKeyword = $("#searchBar").val();

    // Fetch call for Edamam API
    fetch(endpoint + "?q=" + ingKeyword + "&app_id=36d96c48&app_key=" + apiKey + "&from=0&to=15")

    .then(function (response) {
        return response.json();
    })

    .then(function (data){
        console.log(data);

        for (var i = 0; i < data.hits.length; i++){
            var tableRow = $("<tr>");
            var tableData = $("<td>");
            var link = $("<a>").attr("href", data.hits[i].recipe.url).text(data.hits[i].recipe.label);
            var thumbnail = $("<img>").attr("src", data.hits[i].recipe.image).addClass("thumbnail");

            tableData.append(thumbnail);
            tableData.append(link);
            tableRow.append(tableData);
            $("#recipes-table").append(tableRow);
    }});
};

// When the "find recipes" button is clicked...
$("#recipes-button").click(function(){
    apiCall();    
});
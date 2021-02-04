// JavaScript file for Edamam API
$(document).ready(function() {
    var endpoint = 'https://api.edamam.com/search'
    var apiKey = 'dce91a1b6d878956479351767c573add'
    var ingKeyword = ""
    numberResults = 0
    calMin = 0
    calMax = 4000

    // AJAX call for Edamam API
    function ajaxCall(endpoint, apiKey) {
        if (ingKeyword !== "") {

        $.ajax({
                url: endpoint + "?q=" + ingKeyword + "&app_id=36d96c48&app_key=" + apiKey + "&from=0&to=" + numberResults + "&calories=" + calMin + "-" + calMax + "&health=alcohol-free",
                method: "GET"
                }).done(function (response) {
                console.log(response);
            });
        };
    };

    $("#api-button").click(function(){
        ajaxCall(endpoint, apiKey)
    });

});

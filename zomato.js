//81567c6d0a81c709e1edf53310578e0c from zomato
//curl -X GET --header "Accept: application/json" --header "user-key: 81567c6d0a81c709e1edf53310578e0c" "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318"

$(document).ready(function() {
    var entityID = "499";
    var entityType = "city";
    var typeFood = "mexican";
    // var numberResults = "10";

    function ajaxCall(endpoint, apiKey){
       

            $.ajax({
                url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&q=" + typeFood + "%20food",
                method: "GET",
                    headers: {
                        "user-key": "81567c6d0a81c709e1edf53310578e0c",
                        "Content-type": "application/json"
                    } 

                }).done(function (response){
                console.log(response);
                });
            };
               
    $("#api-button").click(function(){
        ajaxCall()
    });
});
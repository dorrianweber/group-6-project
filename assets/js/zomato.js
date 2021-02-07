//81567c6d0a81c709e1edf53310578e0c from zomato
// Conflict testing
//curl -X GET --header "Accept: application/json" --header "user-key: 81567c6d0a81c709e1edf53310578e0c" "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318"

$(document).ready(function() {
        
    var tableBody = document.getElementById('restaurant-table');
    
    function ajaxCall1(){
        var cityName = $("#searchCity").val();
        if(cityName===""){
            var errorMessage = $("<h4>").attr("id", "errorMessage").text("Please enter a city");
            $("#userInputs").append(errorMessage);
            return;
        }
        console.log("cityName", cityName);
        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/locations?query=" + cityName,
            method: "GET",
            headers: {
                "user-key": "81567c6d0a81c709e1edf53310578e0c",
                "Content-type": "application/json"
            },
            
    //     // When call is finished...
        }).done(function (res1){
            
            var x = res1.location_suggestions[0].entity_id;
            console.log("res1: ", res1);
            console.log("entity ID: ", res1.location_suggestions);
            console.log("x: ", x);
            ajaxCall2(x);
        }); 
    };
    
    // AJAX call for Zomato API restaurants
    function ajaxCall2(x){
        // Passes the type of food to search
        var typeFood = $("#searchBar").val();
        // Sets max number of results returned
        var numberResults = $("#numberResults").val();
        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + x + "&entity_type=city&count=" + numberResults + "&q=" + typeFood + "%20food&sort=rating",
            method: "GET",
            headers: {
                "user-key": "81567c6d0a81c709e1edf53310578e0c",
                "Content-type": "application/json"
            },
            
        // When call is finished...
        }).done(function (res){

            // Log the information in the console
            console.log("Food response: ", res);
            
            for (var i = 0; i < res.restaurants.length; i++){
                
                var rating = res.restaurants[i].restaurant.user_rating.aggregate_rating;
                
                var link = document.createElement("a");
                
                var lsHs = document.querySelector("#restaurant-table");
                var address = res.restaurants[i].restaurant.location.address;
                link.textContent = res.restaurants[i].restaurant.name;
                link.href = res.restaurants[i].restaurant.events_url;
                //$("a").attr("href", res.restaurants[i].restaurant.events_url);
                       
                console.log(link);
                var linebreak = document.createElement('br');

                lsHs.append(link, " - ", address, " - Rating ", rating);
                lsHs.append(linebreak);
                
            };
        });  
    };
    
    // When the "restaurants button" is clicked...
    $("#restaurants-button").click(function(){
        // Run "ajaxCall" function
        //add if statement, check if blank, message enter city and type of food
        
        $("#restaurant-table").empty();
        
        ajaxCall1();
        // ajaxCall2(); 

    });
});


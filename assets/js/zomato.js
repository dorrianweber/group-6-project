//81567c6d0a81c709e1edf53310578e0c from zomato
// Conflict testing
//curl -X GET --header "Accept: application/json" --header "user-key: 81567c6d0a81c709e1edf53310578e0c" "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318"

$(document).ready(function() {
    
    // Array for favorited restaurants
    var favoriteRestaurants = [];

    if (localStorage.getItem("favoriteRestaurant")){
        favoriteRestaurants = JSON.parse(localStorage.getItem("favoriteRestaurant"));
    };

    //var tableBody = document.getElementById('restaurant-table');
    
    function ajaxCall1(){
        // Sets city name to what user inputs in search bar
        var cityName = $("#searchCity").val();

        // Creates an error message if user tries to search for restaurants without specifying a city
        if(cityName==="") {
            var errorMessage = $("<h4>").attr("class", "errorMessage").text("Please enter a city");
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
        })

        .done(function (res1){
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
            
            // Populate page with searched restaurant information
            for (var i = 0; i < res.restaurants.length; i++){
                
                var tableRow = $("<div>");
                var link = $("<a>").attr("href", res.restaurants[i].restaurant.events_url).text(res.restaurants[i].restaurant.name);
                var address = res.restaurants[i].restaurant.location.address;
                var rating = res.restaurants[i].restaurant.user_rating.aggregate_rating;
                var favoriteBtn = $("<button>").addClass("favoriteBtn").text("☆");

                tableRow.append(link, " - ", address, " - Rating ", rating, favoriteBtn);
                $("#restaurant-table").append(tableRow);
            };

            // When a restaurant's "favorite" button is clicked
            $(".favoriteBtn").click(function(event){

                // Saves favorited restaurant's title & link as an object in the global array of favorited restaurants
                var newFavorite = {
                    name: event.target.previousElementSibling.text,
                    link: event.target.previousElementSibling.href
                };
    
                favoriteRestaurants.push(newFavorite);
                
                // Saves favorited restaurant's info in local storage
                localStorage.setItem("favoriteRestaurant", JSON.stringify(favoriteRestaurants));
            });

            console.log(typeFood);

            //var foodInputEl = $("#searchBar");

            var foodListEl = $('#food-list');

            var printCity = function(){
                var listEl = $('<li>');
                var listDetail = typeFood;
                console.log("food type: ", typeFood)
                listEl.addClass('list-group-item').text(listDetail);
                listEl.appendTo(foodListEl);
            };

            printCity(typeFood)
        });  
    };
    
    // When the "restaurants button" is clicked...
    $("#restaurants-button").click(function(){
        //add if statement, check if blank, message enter city and type of food
        
        // Clears restaurant information from last search
        $("#restaurant-table").empty();

        // Clears error message if it exists
        $(".errorMessage").remove();

        // Run "ajaxCall" function
        ajaxCall1();
        // ajaxCall2(); 

    });

    // When "load favorite restaurants" button is clicked...
    $("#load-favorite-restaurants").click(function(){

        // Clears out recipe table
        $("#restaurant-favorites-list").empty();

        if (favoriteRestaurants.length){

            // For each item in the "favorite restaurants" array...
            for (var i = 0; i < favoriteRestaurants.length; i++) {
            
                // Add an item to the list with a link to the favorited restaurant
                var favoritedItem = $("<li>").append($("<a>").addClass("favorited-items").text(favoriteRestaurants[i].name).attr("href", favoriteRestaurants[i].link));
                $("#restaurant-favorites-list").append(favoritedItem);
            };

            // Creates a button to clear favorites list & local storage when clicked...
            var clearBtn = $("<button>").addClass("clearBtn").text("Clear Favorites").click(function(){
                $("#restaurant-favorites-list").empty();
                localStorage.clear();
                favoriteRestaurants = [];
            });;

            // And adds it to the page
            $("#restaurant-favorites-list").append(clearBtn);
        };

    });
});


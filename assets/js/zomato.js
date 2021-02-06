//81567c6d0a81c709e1edf53310578e0c from zomato
// Conflict testing
//curl -X GET --header "Accept: application/json" --header "user-key: 81567c6d0a81c709e1edf53310578e0c" "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318"

$(document).ready(function() {
        
    var tableBody = document.getElementById('restaurant-table');
    
    function ajaxCall1(){
        var cityName = $("#searchCity").val();
        if(cityName===""){
            alert("Please enter the name of a city");
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
        var typeFood = $("#searchBar").val();
        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + x + "&entity_type=city&q=" + typeFood + "%20food",
            method: "GET",
            headers: {
                "user-key": "81567c6d0a81c709e1edf53310578e0c",
                "Content-type": "application/json"
            },
            
        // When call is finished...
        }).done(function (res){

            // Log the information in the console
            console.log("Food response: ", res);
            // if(typeFood===""){
            //     alert("Please enter a type of food");
            //     return;
            //     }
            // For loop to populate the table with restaurant information
            for (var i = 0; i < res.restaurants.length; i++){
                var createTableRow = document.createElement('tr');
                var tableData = document.createElement('td');
                var link = document.createElement('a');
                //var rating = $('a').text(res.restaurants[i].restaurant.user_rating.aggregate_rating);
               

                link.textContent = res.restaurants[i].restaurant.name;
                link.href = res.restaurants[i].restaurant.events_url;            
                

                tableData.appendChild(link);
                //tableData.appendChild(rating);

                createTableRow.appendChild(tableData);
                tableBody.appendChild(createTableRow);
                $("#restaurant-table").append(res[i]);
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


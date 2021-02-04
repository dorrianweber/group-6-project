//81567c6d0a81c709e1edf53310578e0c from zomato
// Conflict testing
//curl -X GET --header "Accept: application/json" --header "user-key: 81567c6d0a81c709e1edf53310578e0c" "https://developers.zomato.com/api/v2.1/restaurant?res_id=16774318"

$(document).ready(function() {
    var entityID = "499";
    var entityType = "city";
    var typeFood = "mexican";
    // var numberResults = "10";
    var tableBody = document.getElementById('repo-table'); 
    function ajaxCall(){
       

            $.ajax({
                url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&q=" + typeFood + "%20food",
                method: "GET",
                    headers: {
                        "user-key": "81567c6d0a81c709e1edf53310578e0c",
                        "Content-type": "application/json"
                    } 
                    

                         
                    

                }).done(function (res){
                console.log(res);
                
                for (var i = 0; i < res.restaurants.length; i++){
                    var createTableRow = document.createElement('tr');
                    var tableData = document.createElement('td');
                    var link = document.createElement('a');
                    var pic = document.createElement('img');

                    link.textContent = res.restaurants[i].restaurant.name;
                    link.href = res.restaurants[i].restaurant.events_url;
                    pic.textContent = res.restaurants[i].restaurant.photos_url;
                    pic.href = res.restaurants[i].restaurant.photos_url;
                    
        
                    tableData.appendChild(link);
                    tableData.appendChild(pic);

                    createTableRow.appendChild(tableData);
                    tableBody.appendChild(createTableRow);
                    //$("#repo-table").append(res[i])
                }
                });
                
        };
       
        
        

    $("#api-button").click(function(){
        ajaxCall()
        
    });
});


 //$("#repo-table").append("hello");   
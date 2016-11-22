/*
The immediate following section of code is from view-source:https://www.walkscore.com/professional/api-sample-code.php
Done as to follow their guidelines for branding.
*/

//Make an ajax call to a php page on your domain that will fetch json data from the Walk Score API
//here we use the JQuery library for our Ajax call, but you can use whatever system you like
function injectWalkScore(address,lat,lon){
    address = encodeURIComponent(address);
    var url="http://api.walkscore.com/score?format=json&address=" + address + "&lat=" + lat + "&lon=" + lon + "&wsapikey=8f13071ee40f00639634c4859f8cda96";
    $.ajax( {
        url: url,
        dataType: 'json',
        type:'GET',
        //async: false,
        success: function(data) { displayWalkScore(data); },
        error: function(){ displayWalkScore(""); }
        }
    );
}
//to demonstrate all of our formatting options, we'll pass the json on to a series of display functions.
//in practice, you'll only need one of these, and the ajax call could call it directly as it's onSuccess callback
function displayWalkScores(jsonStr) {
    displayWalkScore(jsonStr);
}

//show the walk score -- inserts walkscore html into the page.  Also needs CSS from top of file
function displayWalkScore(jsonStr) {
    var json=(jsonStr) ? eval('(' + jsonStr + ')') : ""; //if no response, bypass the eval

    //if we got a score
    if (json && json.status == 1) {
        var htmlStr = '<a target="_blank" href="' + json.help_link + '"><img src="' + json.logo_url + '" /><span class="walkscore-scoretext">' + json.walkscore + '</span></a>';
    }
    //if no score was available
    else if (json && json.status == 2) {
        var htmlStr = '<a target="_blank" href="' + json.help_link + '"><img src="' + json.logo_url + '" /></a> <a href="' + json.ws_link + '"><span class="walkscore-noscoretext">Get Score</span></a>';
    }
    //if didn't even get a json response
    else {
        var htmlStr = '<a target="_blank" href="https://www.walkscore.com"><img src="//cdn2.walk.sc/2/images/api-logo.png" /> <span class="walkscore-noscoretext">Get Score</span></a> ';
    }
    var infoIconHtml = '<span id="ws_info"><a href="https://www.redfin.com/how-walk-score-works" target="_blank"><img src="//cdn2.walk.sc/2/images/api-more-info.gif" width="13" height="13"" /></a></span>';

    //if you want to wrap extra tags around the html, can do that here before inserting into page element
    htmlStr = '<p>' + htmlStr + infoIconHtml + '</p>';

    //insert our new content into the container div:
	$("#walkscore-div").html(htmlStr);
}


// End of Walkscore code //

/*
Function:   bindInfoWindow
Parameters: marker - google maps marker Object
            map - google maps map Object
            infowindow - google maps infowindow Object
            html - html string to fill the infowindow Object
Return:     N/A 
Purpose:    Binds an infowindow with the inputed markup to a 
            specific marker and registers the on click function
            to open said infowindow
Credit to user Ducan - http://stackoverflow.com/questions/9475830/google-maps-api-v3-markers-all-share-the-same-infowindow
*/
function bindInfoWindow(marker, map, infowindow, html, address, lat, lng) {
    marker.addListener('click', function() {
        infowindow.setContent(html);
        injectWalkScore(address, lat, lng);
        infowindow.open(map, this);
    });
}

/*
Function:   buildContentString
Parameters: currentHouse - Object of current house
Return:     contentString - string to be placed in infowindow
Purpose:    It creates the html (in a string) that is to be placed in the infowindow 
            for the current marker. Some logic is applied for items such as dollar amounts.
*/
function buildContentString(currentHouse) {
    var contentString = '<div id="content">'+
                            '<div id="siteNotice">'+
                                '</div>'+
                                '<h3 id="firstHeading" class="firstHeading">' + currentHouse["address"] + '</h3>'+
                                '<div id="bodyContent">';
    // Rent
    if(currentHouse["rent"] == "N/A") {
        contentString += '<p>Rent: N/A </p>';
    } else {
        contentString += '<p>Rent: $' + currentHouse["rent"] + '</p>';
    }

    // Electric
    if(currentHouse["eBill"] == "N/A") {
        contentString += '<p>Electric Bill: N/A </p>';
    } else {
        contentString += '<p>Electric Bill: $' + currentHouse["eBill"] + '</p>';
    }

    // Gas
    if(currentHouse["gBill"] == "N/A") {
        contentString += '<p>Gas Bill: N/A </p>';
    } else {
        contentString += '<p>Gas Bill: $' + currentHouse["gBill"] + '</p>';
    }

    // Recycle
    contentString += '<p>Recycle: ' + currentHouse["recycle"] + '</p>';

    // Compost
    contentString += '<p>Compost: ' + currentHouse["compost"] + '</p>';

    // Bus
    contentString += '<p>Bus Line: ' + currentHouse["busline"] + '</p>';

    // Bike 
    contentString += '<p>Bike Lane: ' + currentHouse["bikelane"] + '</p>';

    //Walkscore
    //var innerHtml = injectWalkScore(currentHouse["address"], currentHouse["lat"], currentHouse["lng"]);
    //contentString += '<div id=\"walkscore-div\">' + innerHtml + '</div>'; 
    contentString += '<div id=\"walkscore-div\"></div>'; 

    // End divs
    contentString += '</div></div>';
    
    return contentString;
}


/*
Function:   initMap 
Parameters: N/A 
Return:     N/A
Purpose:    Main initialize function for Google Maps API
            Creates map and populates it with markers whose data
            comes from a Firebase database
*/
function initMap() {
    
    var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: new google.maps.LatLng(48.7426504, -122.522149)
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i, contentString;

    // This loop iterates through all the locations recieved from the firebase db
    // and creates the clickable markers that open an infowindow of data
    for (i = 0; i < Object.keys(locations).length; i++) {

        var key = Object.keys(locations)[i];
        var currentHouse = locations[key];

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(currentHouse["lat"], currentHouse["lng"]),
            map: map,
            title: currentHouse["address"]
        });

        contentString = buildContentString(currentHouse);

        bindInfoWindow(marker, map, infowindow, contentString, currentHouse["address"], currentHouse["lat"], currentHouse["lng"]);
    }

}
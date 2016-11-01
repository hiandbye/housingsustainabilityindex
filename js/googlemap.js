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
function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function() {
        infowindow.setContent(html);
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

        bindInfoWindow(marker, map, infowindow, contentString);
    }

}
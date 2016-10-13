// Credit to user Ducan - http://stackoverflow.com/questions/9475830/google-maps-api-v3-markers-all-share-the-same-infowindow
function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function() {
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
}

function initMap() {
    var contentString1 = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">House 1</h1>'+
        '<div id="bodyContent">'+
        '<p> Info goes here' +
        '</p>' +
        '</div>'+
        '</div>';

    var contentString2 = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">House 2</h1>'+
        '<div id="bodyContent">'+
        '<p> Info goes here' +
        '</p>' +
        '</div>'+
        '</div>';

    var houses = [
    ['House 1', 48.7426504, -122.522149, contentString1],
    ['House 2', 48.743453, -122.478466, contentString2]
    ];
    
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(48.7426504, -122.522149)
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i, contentString;

    for (i = 0; i < Object.keys(locations).length; i++) {
        var key = Object.keys(locations)[i];
        var currentHouse = locations[key];
        console.log(key);

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(currentHouse["lat"], currentHouse["lng"]),
            map: map,
            title: currentHouse["address"]
        });

        contentString =    '<div id="content">'+
                                    '<div id="siteNotice">'+
                                    '</div>'+
                                    '<h1 id="firstHeading" class="firstHeading">' + currentHouse["address"] + '</h1>'+
                                    '<div id="bodyContent">'+
                                        '<p> Rent: ' + currentHouse["rent"] +
                                        '</p>' +
                                    '</div>'+
                                '</div>';

        /*google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
            }
        })(marker, i));*/
        bindInfoWindow(marker, map, infowindow, contentString);
    }

}
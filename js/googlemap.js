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

    var marker, i;
    for (i = 0; i < houses.length; i++) {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(houses[i][1], houses[i][2]),
        map: map,
        title: houses[i][0]
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
        infowindow.setContent(houses[i][3]);
        infowindow.open(map, marker);
        }
    })(marker, i));
    }

}
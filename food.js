var infoWindow;

$(document).ready(applyClickHandler);

/**
 * Apply click handler to FindMore button
 */
function applyClickHandler(){
  $("#findMore").click(showMap);
}

function showMap(){
  $("#pic").hide();
  $("#map").show();
}

let foodInput = sessionStorage.getItem("setFood");
console.log("foodInput: ", foodInput);
$("#pac-input").val("foodInput");

function initAutocomplete() {
    var origin = {lat: -33.8688, lng: 151.2195};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: origin,
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // var clickHandler = new ClickEventHandler(map, pos);

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are Here');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            console.log(place);
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),// 17 34
                scaledSize: new google.maps.Size(25, 25)
            };

            var infoWindow = new google.maps.InfoWindow({
                content: `${place.name} <br> Rating: ${place.rating} `,
                pixelOffset: new google.maps.Size(0, 0)
            });

            var markerLocation = new google.maps.Marker({
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
                title: place.name,
                position: place.geometry.location
            });

            markerLocation.addListener('click', function() {
                infoWindow.open(map, markerLocation);
                // testClick(place.formatted_address);
                testClick(place);
            });

            // Create a marker for each place.
            markers.push(markerLocation);

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

//assign global variable placeObj to place we clicked (pass to yelp api)
function testClick(addr){
    console.log('From test click:', addr);
    placeObj = addr;

}

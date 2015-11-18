
// Global Variables
var rootLatLng = {lat: 60.187, lng: 24.820};
var locations = [{coord: rootLatLng, desc: "TUAS-Building", active: false, winter: true, summer: true},
    {coord: {lat: 60.220, lng: 24.865}, desc: "Strömbergin puisto", active: false, winter: true, summer: true},
    {coord: {lat: 60.258, lng: 24.603}, desc: "Sorlammen luontopolku", active: false, winter: false, summer: true},
    {coord: {lat: 60.294, lng: 24.558}, desc: "Päivättärenpolku", active: false, winter: true, summer: true},
    {coord: {lat: 60.242, lng: 24.656}, desc: "Oittaan luontopolku", active: false, winter: true, summer: false},
    {coord: {lat: 60.188, lng: 24.813}, desc: "Laajalahden luontopolku", active: false, winter: false, summer: true},];
var map;
var markers = [];
var summerFilter = false;
var winterFilter = false;

function initMap() {
  console.log("initMap");
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('gMap'), {
    center: rootLatLng,
    scrollwheel: true,
    zoom: 10
  });

  // Create a marker and set its position.
  for (var i = 0; i < locations.length; i++) {
    var title = "location: " + i;

    var marker = new google.maps.Marker({
      map: null,
      position: locations[i].coord,
      title: title
    });
    markers.push(marker);

    var infowindow = new google.maps.InfoWindow();
    var content = locations[i].desc + ", summer: " + locations[i].summer + ", winter: " + locations[i].winter;

    google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
        return function() {
            infowindow.setContent(content);
            infowindow.open(map,marker);
        };
    })(marker,content,infowindow));

  };  
}

function initFilters() {

  var filterElement = $("#locationFilter");


  $("#toggle").click(function() {
    $("#HELLUREI").toggle();
  });

  $("#markerList").click(function(event) {
    console.log("markerList click");
    var target = $(event.target);
    var index = target.index();
    var marker = markers[index];
    marker.setMap(map);
  });

  $("#summerChx").click(function() {
    summerFilter = $("#summerChx").prop("checked");
    console.log(summerFilter);
    updateMarkers();
  });

  $("#winterChx").click(function() {
    winterFilter = $("#winterChx").prop("checked");
    console.log(winterFilter);
    updateMarkers();
  });
}

// Sets the map on all markers in the array.
function setMapOnAll(map, locations) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers(locations) {
  setMapOnAll(null, locations);
}

// Shows any markers currently in the array.
function showMarkers(locations) {
  setMapOnAll(map, locations);
}


function updateMarkers() {
  for (var i = 0; i < markers.length; i++) {
    var marker = markers[i];
    var location = locations[i];
    console.log(marker);
    if (location.summer == true) {
      console.log("summerFilter");
      if (summerFilter == true) {
        location.active = true;
        marker.setMap(map);
        continue;
      }
    }
    if (location.winter == true) {
      console.log("winterFilter");
      if (winterFilter == true) {
        location.active = true;
        marker.setMap(map);
        continue;
      }
    }
    location.active = false;
    marker.setMap(null);
  }
  updateLocationList();

}

function updateLocationList() {
  var markerList = $("#markerList");
  markerList.html("");
  for (var i = 0; i < locations.length; i++) {
    var location = locations[i];
    if (location.active === true) {
      markerList.append("<li id='locationElement" + i + "'>" + location.desc + "</li>");
    }
  }
}

//initMap();
initFilters();
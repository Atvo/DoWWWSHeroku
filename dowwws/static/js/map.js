
// Global Variables
var activities = ["Hiking", "Kayaking", "Swimming", "Skiing"]
var activeActivities = [];

var rootLatLng = {lat: 60.187, lng: 24.820};
var locations = [
    {coord: {lat: 60.220, lng: 24.865}, activityList: [0, 1, 0, 0], desc: "Strömbergin puisto", active: false},
    {coord: {lat: 60.258, lng: 24.603}, activityList: [0, 0, 1, 0], desc: "Sorlammen luontopolku", active: false},
    {coord: {lat: 60.294, lng: 24.558}, activityList: [0, 1, 1, 1], desc: "Päivättärenpolku", active: false},
    {coord: {lat: 60.242, lng: 24.656}, activityList: [1, 0, 0, 0], desc: "Oittaan luontopolku", active: false},
    {coord: {lat: 60.188, lng: 24.813}, activityList: [0, 1, 0, 1], desc: "Laajalahden luontopolku", active: false},
    ];
var activeLocations = []
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
    var dist = calculateDistance(locations[0], locations[i]);

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

function initActivities() {
  console.log("initActivities");

  for (var i = 0; i < activities.length; i++) {
    var activity = activities[i];
    activeActivities.push({name: activity, active: false});
  }
}

function initFilters() {
  console.log("initFilters");

  var filterElement = $("#locationFilter");

  // Create Checkboxes in to locationForm
  var locationForm = $("#locationForm");
  for (var i = 0; i < activities.length; i++) {
    var activity = activities[i];
    locationForm.append("<input id='" + activity + "Chx' type='checkbox' name='activity' value='" + activity + "'><label class='checkbox inline'>&nbsp;" + activity + "</label><br>");
  }

  $("#markerList").click(function(event) {
    console.log("markerList click");
    var target = $(event.target);
    var index = target.index();
    locLat = activeLocations[index].coord.lat;
    locLng = activeLocations[index].coord.lng;
    var locCoord = new google.maps.LatLng(locLat, locLng);
    map.panTo(locCoord);
    map.setZoom(11);
  });

  // Create Listeners for activities
  console.log("Create Listeners");

  function generateListener(j, selectorStr) {
    return function(event) {
      activeActivities[j].active = $(selectorStr).prop("checked");
      updateMarkers();
    };
  }

  for (var i = 0; i < activities.length; i++) {
    var activity = activities[i];
    var selectorStr = "#" + activity + "Chx";
    $(selectorStr).click(generateListener(i, selectorStr));
  }
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
    location.active = false;
    marker.setMap(null);
    for (var j = 0; j < activities.length; j++) {
      var activity = activities[j];
      if (activeActivities[j].active && location.activityList[j] == 1) {
        location.active = true;
        marker.setMap(map);
      }
    }
  }
  updateLocationList();

}

function updateLocationList() {
  activeLocations = []
  var markerList = $("#markerList");
  markerList.html("");
  var idx = 0
  for (var i = 0; i < locations.length; i++) {
    var location = locations[i];
    if (location.active === true) {
      activeLocations[idx] = location;
      markerList.append("<li id='locationElement" + i + "'>" + location.desc + "</li>");
      idx += 1;
    }
  }
}

function calculateDistance(coord1, coord2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (coord1.coord.lat-coord2.coord.lat).toRad();  // Javascript functions in radians
  var dLon = (coord1.coord.lng-coord2.coord.lng).toRad(); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(coord1.coord.lat.toRad()) * Math.cos(coord2.coord.lat.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;

}

if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

//initMap();
initActivities();
initFilters();

// Global Maps Variables
var activities = ["Hiking", "Kayaking", "Skiing", "Walking"]
var activeActivities = [];

var rootLatLng = {lat: 60.187, lng: 24.820};
var locations = [
    {coord: {lat: 60.220, lng: 24.865}, activityList: [0, 0, 0, 1], desc: "Strömbergin puisto", address: "Strömbergintie 2, Helsinki", active: false, description: "Strömbergin puisto is a small city park with the only real natural waterfall in Helsinki.", 
    photoCoord: {maxLat: 60.2214, minLat: 60.2185, maxLng: 24.8676, minLng: 24.8637}},

    {coord: {lat: 60.258, lng: 24.618}, activityList: [1, 0, 0, 0], desc: "Sorlammen luontopolku", address: "Nuuksionkuja 2, Espoo", active: false, description: "Sorlammen nature trail is a 5 km circle in the southern part of Nuuksio national park. The trail has medium difficulty level and suitable for a half day trip. There is a picnic place with a scenic view at the lake. It is possible to take a short easy part of the loop from the parking site to the picnic place.", 
    photoCoord: {maxLat: 60.2611, minLat: 60.2521, maxLng: 24.6219, minLng: 24.6067}},

    {coord: {lat: 60.294, lng: 24.558}, activityList: [1, 0, 0, 1], desc: "Päivättärenpolku", address: "Nuuksiontie 84, Espoo", active: false, description: "This is a 1.4 km trail through a hilly terrain but on a easily accessible path located next to Haltia Finnish Nature center.",
    photoCoord: {maxLat: 60.2968, minLat: 60.2939, maxLng: 24.5639, minLng: 24.5599}},

    {coord: {lat: 60.242, lng: 24.656}, activityList: [0, 0, 0, 1], desc: "Oittaan luontopolku", address: "Kunnarlantie 39, Espoo", active: false, description: "A short 1.5 km and easy path along the fields and horse stables, but it is not well marked. Some parts close to the lake are not cleared and may be difficult to find.",
    photoCoord: {maxLat: 60.2439, minLat: 60.2388, maxLng: 24.6592, minLng: 24.6491}},

    {coord: {lat: 60.152, lng: 24.718}, activityList: [0, 0, 0, 1], desc: "Finnoon luontopolku", address: "Hyljeluodontie 3, Espoo", active: false, description: "Finnoon 1.6 km nature path is one of the best lowland birdwatching sites at close to the sea shore.",
    photoCoord: {maxLat: 60.1548, minLat: 60.1503, maxLng: 24.7244, minLng: 24.7133}},

    {coord: {lat: 60.188, lng: 24.813}, activityList: [0, 1, 1, 0], desc: "Laajalahden luontopolku", address: "Konemiehentie 4, Espoo", active: false, description: "A wonderful walking 2.9 km long easy path connects two birdwatching towers at the shore of Laajalahti bay. A small nature center Villa Elfvik at the northern end of the trail located in impressive patch of real old-growth forest – it is hard to believe that such a wonder can be found inside the city.",
    photoCoord: {maxLat: 60.2003, minLat: 60.1877, maxLng: 24.8217, minLng: 24.8122}},

    ];
var activeLocations = []
var map;
var markers = [];
var summerFilter = false;
var winterFilter = false;

// Global Places Variables
var service;
var infowindow = null;

function initMap() {
  console.log("initMap");
  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('gMap'), {
    center: rootLatLng,
    scrollwheel: true,
    zoom: 10
  });
  service = new google.maps.places.PlacesService(map);


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

    var location = locations[i];

    google.maps.event.addListener(marker,'click', (function(marker,location){ 
        return function() {
            if (infowindow) {
                infowindow.close();
            }
            infowindow = new google.maps.InfoWindow();
            infowindow.setContent(location.desc);
            infowindow.open(map,marker);
            updateLocationDescription(location);
            getPlacePhotos(location);
        };
    })(marker,location));

  };  
}

function initActivities() {
  console.log("initActivities");

  for (var i = 0; i < activities.length; i++) {
    var activity = activities[i];
    activeActivities.push({name: activity, active: false});
  }
}

function updateLocationDescription(location) {

  var locHdng = $("#locationHeading");
  locHdng.html("");
  locHdng.html("<h2>" + location.desc + "</h2>");

  var locDesc = $("#locationDescription");
  locDesc.html("");
  locDesc.html("<p>" + location.description + "</p>");

  var locInfo = $("#locationInfo");
  locInfo.html("");
  var htmlStr = "";
  for(var i = 0; i < location.activityList.length; i++) {
    if(location.activityList[i] == 1) {
      console.log("TRUE");
      htmlStr = htmlStr + activities[i] + ", ";
      console.log(htmlStr);
    }
  }
  if (htmlStr != "") {
    htmlStr = htmlStr.slice(0, (htmlStr.length - 2));
    htmlStr = "Activities here: " + htmlStr;
  }

  htmlStr = "Address: " + location.address + "<br>" + htmlStr;
  locInfo.html(htmlStr);
}

function getPlacePhotos(location) {
  lat = location.coord.lat;
  lng = location.coord.lng;
  console.log("getPlacePhotos");
  if (location.photoCoord != undefined) {
    maxLat = location.photoCoord.maxLat;
    maxLng = location.photoCoord.maxLng;
    minLat = location.photoCoord.minLat;
    minLng = location.photoCoord.minLng;
    var url_str = "//www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=6&minx=" + (minLng) + "&miny=" + (minLat) + "&maxx=" + (maxLng) + "&maxy=" + (maxLat) + "&size=medium&mapfilter=true";
  }
  else {
    var wiggle = 0.002;
    var url_str = "//www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=6&minx=" + (lng - wiggle) + "&miny=" + (lat - wiggle) + "&maxx=" + (lng + wiggle) + "&maxy=" + (lat + wiggle) + "&size=medium&mapfilter=true";
  }
  var desc = location.desc;
  console.log(url_str);
  var coord = new google.maps.LatLng(lat,lng);
  $.ajax({ 
   type: "GET",
   dataType: "jsonp",
   url: url_str,
   success: function(data){
      displayPhotos(data, desc);
   }
  });
}

function displayPhotos(data, desc) {


  console.log(data.photos.length);
  var el = $("#locationPhotoContainer");
  el.html("");

  for (var i = 0; i < data.photos.length; i++) {
    var photo = data.photos[i]
    console.log(JSON.stringify(photo));
    tmpEl = $('<img class="img-responsive customer-img popUpImage" src="' + photo.photo_file_url + '" alt="">').appendTo($('<div class="col-md-2 col-sm-4 col-xs-6"></div>').appendTo('#locationPhotoContainer'));
    (function (photo) {
      tmpEl.on( "click", function( event ) {
        var imageCopy = $(this).clone();
        imageCopy.on( "click", function( event ) {
          console.log(i);
          console.log(photo.photo_url);
          window.location.href = photo.photo_url;
        });
        console.log(photo.photo_url)
        height = this.naturalHeight;
        width = this.naturalWidth;
        windowWidth = $(window).width();
        windowHeight = $(window).height();
        var x = windowWidth / 2 - width / 2;
        var y = windowHeight / 2 - height / 2;
        imageCopy.bPopup({
            positionStyle: 'fixed',
            position: [x, y],
        });
      })
    })(photo);

  }
  if ( $( "#panoramioEl" ).length == 0) {
    var panoramioEl = el.after("<img id='panoramioEl' class='img-responsive customer-img' src='/static/media/Logo-panoramio-google.png' alt=''></img>");
    el.after("<p>Photos are collected automatically from <a href='http://www.panoramio.com/'>Panoramio</a><br>Photos provided by Panoramio are under the copyright of their owners<br>Clicking a photo will redirect you to the Panoramio service</p>");
  }
}


function initFilters() {
  console.log("initFilters");

  var filterElement = $("#locationFilter");

  // Create Checkboxes in to locationForm
  var locationForm = $("#locationForm");
  for (var i = 0; i < activities.length; i++) {
    var activity = activities[i];
    locationForm.append("<input id='" + activity + "Chx' type='checkbox' name='activity' value='" + activity + "'><label class='checkbox inline' for='" + activity + "Chx'>&nbsp;" + activity + "</label><br>");
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
    updateLocationDescription(activeLocations[index]);
    getPlacePhotos(activeLocations[index]);
  });

  // Create Listeners for activities
  console.log("Create Listeners");

  function generateActivityListener(j, selectorStr) {
    return function(event) {
      activeActivities[j].active = $(selectorStr).prop("checked");
      updateMarkers();
      //getPlacePhotos(locations[j]);
    };
  }

  for (var i = 0; i < activities.length; i++) {
    var activity = activities[i];
    var selectorStr = "#" + activity + "Chx";
    $(selectorStr).click(generateActivityListener(i, selectorStr));
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
  markerList.append("List of Locations:");
  var idx = 0
  for (var i = 0; i < locations.length; i++) {
    var location = locations[i];
    if (location.active === true) {
      activeLocations[idx] = location;
      markerList.append("<li id='locationElement" + i + "' class='locationElement'>" + location.desc + "</li>");
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
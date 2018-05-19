L.mapbox.accessToken = 'pk.eyJ1IjoidmFyZ2ZyYW4iLCJhIjoiRW44bEMyQSJ9.i3kosn_djpsoR6Qy4TO0Vw#15';
//constraining the map to just Edinburgh
var southWest = L.latLng(70.606491, 29.318000),
    northEast = L.latLng(59.656861, 20.433994),
    bounds = L.latLngBounds(southWest, northEast);
//obtaining maptile from mapbox + setting view to campus
var map = L.mapbox.map('map', 'vargfran.b9bd48fd', {
				    maxBounds: bounds,
				    maxZoom: 19,
				    minZoom: 3
				}).setView([ 60.1407348, 24.9227410184456], 5);
var featureGroup = L.featureGroup().addTo(map);
//following variables are used to hide, display and
// draw elements dynamically in the main view
var clickCount = 0;
var craftPath = false;
var coords = [];
var walk = [];
var linePresance = 0;
var polyline = 0;

var drawControl = new L.Control.Draw({
edit: {
  featureGroup: featureGroup
}
}).addTo(map);

map.on('draw:created', function(e) {
  featureGroup.addLayer(e.layer);
});

var popup = L.popup();

// Parse lat long
function parseLatLong(latStr){
	var n = latStr.length;
	var outStr = "";
	for(i = 0; i < n; i ++){
    if (latStr[i] ===  " " ){
      continue;
    }
		if(!isNaN(latStr[i]) || latStr[i]===',' || latStr[i]==='.'  || latStr[i]==='-' ){
			outStr += latStr[i];
		}
	}
  console.log(outStr);
	return outStr;
};

// String formatting function.
String.prototype.format = function() {
  var formatted = this;
  for( var arg in arguments ) {
      formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};


//Method that obtains address at every point and displays on click
//Method responsible for displaying and hiding tabs for paht creation
function reverseGeoCode(e){
	//bollean vairable used to communicate conditions between the server
	// side and the client
	//var bol = $.parseJSON(p[0]);
	var latLong = parseLatLong(e.latlng.toString()).split(",");
	//Reverse geocoding API
  console.log(latLong);
	var api_call = "http://nominatim.openstreetmap.org/reverse?format=json&lat={0}&lon={1}&zoom=18&addressdetails=1"
	var url = api_call.format(latLong[0],latLong[1]);
	// counting clicks to hide and display rank entry form

  // Getting JSON addres from openstreetmaps API
	jQuery.getJSON(url).done([function(data){
		var address = data["display_name"];

	// coords.push({'lat' : latLong[0],
	// 						'long': latLong[1],
	// 						'addr': address});


		popup.setLatLng(e.latlng)
		     .setContent(address)
		      .openOn(map);

	 }]);

}

//The random walk function requests a random walk from the front end.
// It draws the random walk and allows the user to rank it
function GeoCode(){
	document.getElementById('rank_path').style.display = 'block';
	var api_call1 = "http://nominatim.openstreetmap.org/search/{0},%20City of Edinburgh,%20Scotland,%20?format=json&addressdetails=1&limit=1&polygon_svg=1";
	var start = document.getElementById('start_point').value;

	var url1 = api_call1.format(start);

}



map.on('click', reverseGeoCode);

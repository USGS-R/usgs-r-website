
$(document).ready(function(){

//Upcoming event locations icon color
//From https://github.com/pointhi/leaflet-color-markers/blob/master/js/leaflet-color-markers.js
var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//Past event locations icon color
var blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//Set up the map
var map = L.map('map').setView([39.409258, -98.569441],  3);
	
//Marker locations for past events
var flwsc = L.marker([26.077432, -80.247741], {icon: blueIcon}).addTo(map);
var nmwsc = L.marker([35.129985, -106.582949], {icon: blueIcon}).addTo(map);
var egsc = L.marker([38.910566, -77.361228], {icon: blueIcon}).addTo(map);
var mtwsc = L.marker([46.584066, -112.042416], {icon: blueIcon}).addTo(map);
var fort = L.marker([40.559101, -105.082592], {icon: blueIcon}).addTo(map);
var tampa = L.marker([28.0149678, -82.422698], {icon: blueIcon}).addTo(map);
var lmgwsctn = L.marker([36.149729, -86.781161], {icon: blueIcon}).addTo(map);
var lmgwscar = L.marker([34.732714, -92.292645], {icon: blueIcon}).addTo(map);
var crrl = L.marker([45.710307, -121.660068], {icon: blueIcon}).addTo(map);

//Popups for past event locations
flwsc.bindPopup("<h4>Florida Water Science Center</h4><p>11 Attendees</p>");
nmwsc.bindPopup("<h4>New Mexico Water Science Center</h4><p>16 Attendees</p>");
egsc.bindPopup("<h4>Eastern Geographic Science Center</h4><p>20 Attendees</p>");
mtwsc.bindPopup("<h4>Wyoming-Montana Water Science Center</h4><p>16 Attendees</p>");
fort.bindPopup("<h4>Fort Collins Science Center</h4><p>29 Attendees</p>");
tampa.bindPopup("<h4>Southwest Florida Water Management District</h4><p>18 Attendees</p>");
lmgwsctn.bindPopup("<h4>Lower-Mississippi Gulf Water Science Center in Nashville, TN</h4><p>15 Attendees</p>");
lmgwscar.bindPopup("<h4>Lower-Mississippi Gulf Water Science Center in Little Rock, AR</h4><p>18 Attendees</p>");
crrl.bindPopup("<h4>Columbia River Research Laboratory</h4><p>21 Attendees</p>");

//Marker locations for future events
var sawscnc = L.marker([35.779142, -78.638706], {icon: redIcon}).addTo(map);

//Popups for future event locations 
sawscnc.bindPopup("<h4>South Atlantic Water Science Center in Raleigh, NC</h4><p>Feb 7-9, 2017</p>");

//Grouping icons for layer switcher
var hasBeens = L.layerGroup([flwsc, nmwsc, egsc, mtwsc, fort, tampa, lmgwsctn, lmgwscar, crrl]).addTo(map);
var willBe = L.layerGroup([sawscnc]).addTo(map);

//Map tile
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibXdlcm5pbW9udCIsImEiOiJjaWt0dWg4eXowMDd3djJtM3Bibmpkb3F2In0.j5jZZozQE9mnpmfuw_orXQ'
}).addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

var div = L.DomUtil.create('div', 'info legend');

div.innerHTML += '<img src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png">Upcoming Events<br/>';
div.innerHTML += '<img src="https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png">Past Events';

return div;
}
legend.addTo(map);

// layer toggle
// Use basemaps instead of overlays because basemaps allows only one to be on at a time, and we always want one to be on. swap basemaps with overlays if you want checkboxes. collapsed false refers to the toggle not being hidden initially
var overlays = {
  "Upcoming Events": willBe,
  "Past Events": hasBeens
};
var layerControl = L.control.layers(null, overlays, {
  collapsed: false
});
map.addControl(layerControl);

});

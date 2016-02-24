
$(document).ready(function(){
	
//Marks location
var map = L.map('map').setView([39.409258, -98.569441], 3);

var marker = L.marker([26.077432, -80.247741]).addTo(map);

var nmwsc = L.marker([35.129985, -106.582949]).addTo(map);

var egsc = L.marker([38.910566, -77.361228]).addTo(map);

var mtwsc = L.marker([46.584066, -112.042416]).addTo(map);

//Popups for locations above
marker.bindPopup("<h4>Florida Water Science Center</h4><p>12 Attendees</p>");
nmwsc.bindPopup("<h4>New Mexico Water Science Center</h4><p>15 Attendees</p>");
egsc.bindPopup("<h4>Eastern Geographic Science Center</h4><p>600,000 Attendees!!</p>");
mtwsc.bindPopup("<h4>Wyoming-Montana Water Science Center</h4><p>16 Attendees</p>");

//Map tile
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibXdlcm5pbW9udCIsImEiOiJjaWt0dWg4eXowMDd3djJtM3Bibmpkb3F2In0.j5jZZozQE9mnpmfuw_orXQ'
}).addTo(map);

});

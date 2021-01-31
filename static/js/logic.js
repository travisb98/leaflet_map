
/// making the map
var myMap = L.map('mapid',{
  center:[40.7128,-74.0059],
  zoom:8
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson"


var startTime ="2014-01-01";

var endTime="2014-01-02";

var maxLongitude ="-69.52148437";

var minLongitude ="-123.83789062";

var maxLatitude ="48.74894534";

var minLatitude="25.16517337";

var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" + 
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";


d3.json(queryUrl, function(data){
  console.log(data);

});
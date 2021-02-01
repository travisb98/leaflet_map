
/// making the map
var myMap = L.map('mapid',{
  center:[39.7128,-120.0059],
  zoom:5
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

var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

var startTime ="2014-01-01";

var endTime="2014-01-02";

var maxLongitude ="-69.52148437";

var minLongitude ="-123.83789062";

var maxLatitude ="48.74894534";

var minLatitude="25.16517337";


// //// query 
// d3.json(queryUrl, function(data){
//   console.log(data);

// });


// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" + 
//   "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

/// function for plotting markers
function makeMarkers(data){
  for (var x = 0; x < data.features.length; x++){
    var lat = data.features[x].geometry.coordinates[1];
    var lon = data.features[x].geometry.coordinates[0];
    L.marker([lat,lon]).addTo(myMap);
  };
}


////// should I make this a layer instead of just adding them all to the map individually
function makeCircles(data){
  for (var x = 0; x < data.features.length; x++){

    /// maybe define these variables outside the function and pass them into the function since we'll use them for multiple functions????
    var lat = data.features[x].geometry.coordinates[1];
    var lon = data.features[x].geometry.coordinates[0];
    var depth = data.features[x].geometry.coordinates[2];

    var property = data.features[x].properties;

    var magnitude = data.features[x].properties.mag;

    console.log(property);

    // console.log(magnitude);

    L.circle([lat,lon],{
      fillOpacity: .75,
      //// need to change this color based on the size of the circle?
      color: "white",
      radius: depth * 5000

    }).bindPopup('<h3> Magnitude: </h3>'+magnitude).addTo(myMap);

  }


}



//// query 
d3.json(queryUrl+"&starttime="+startTime+"&endtime="+endTime+"&maxlongitude="+maxLongitude+"&minlongitude="+minLongitude+"&maxlatitude="+maxLatitude+"&minlatitude="+minLatitude, function(data){
  // console.log(data);


  // ///unpacking json
  // var bbox = data.bbox;
  // var features = data.features;
  // var metadata = data.metadata;
  // console.log(data.bbox);
  // console.log(data.features);
  // console.log(data.metadata);
  // console.log(data.features.length);
  // console.log(data.features);
  // console.log(data.features[0].geometry);
  // console.log(data.features[0].properties);
  // L.marker([39.7128,-120.0059]).addTo(myMap);


  // makeMarkers(data);

  makeCircles(data);
  console.log(data)


  // function makeQuakes (features){

  //   function eachFeat (feature,layer){

  //   }

  // };


});





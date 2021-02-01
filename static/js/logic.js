
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


// function bwColorScale(list){

//   //// returns the max magnitude 
//   var max = Math.max.apply(Math,list);
//   var min = Math.min.apply(Math,list);

//   mag.forEach(function(x){
    
//     var colorVar=parseInt(((x-min)/(max-min)*255))
    
//     console.log(`rgb(${colorVar},${colorVar},${colorVar})`);

    
//   });


// return 

// };




//  make sure you're follwing these instructions, I may have switch depth and magnitutde on some of the asks:

// "Your data markers should reflect the magnitude of the
// earthquake by their size and and depth of the earth quake by
// color. Earthquakes with higher magnitudes should appear
// larger and earthquakes with greater depth should appear darker in color."


////// should I make this a layer instead of just adding them all to the map individually
function makeCircles(data){


  ////// need to sort data.features by depth so i can put the smallest circles on top

  var features = data.features.sort(function(a,b){
    return b.properties.mag - a.properties.mag;
  });

  console.log(features);

  
  //// creates a list of all the magnitudes
  var mag_list = features.map(x => x.properties.mag);

  //// returns the min and max magnitude 
  var maxMagnitude = Math.max.apply(Math,mag_list);
  var minMagnitude = Math.min.apply(Math,mag_list);


  for (var x = 0; x < features.length; x++){


    /// maybe define these variables outside the function and pass them into the function since we'll use them for multiple functions????
    var lat = features[x].geometry.coordinates[1];
    var lon = features[x].geometry.coordinates[0];
    var depth = features[x].geometry.coordinates[2];

    var property = features[x].properties;

    var magnitude = features[x].properties.mag;

    // console.log(property);

    // console.log(magnitude);


    var colorVar=parseInt(((magnitude-minMagnitude)/(maxMagnitude-minMagnitude)*255))
    
    colorVar = `rgb(${colorVar},${colorVar},${colorVar})`


    L.circle([lat,lon],{
      fillOpacity: .75,
      //// need to change this color based on the size of the circle?
      color: colorVar,
      radius: depth * 5000
    }).bindPopup(
      '<h3> Magnitude: </h3>'+magnitude+'<br>'+
      '<h3> Depth: </h3>'+depth
    ).addTo(myMap);

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
  // console.log(data)


  // function makeQuakes (features){

  //   function eachFeat (feature,layer){

  //   }

  // };


});





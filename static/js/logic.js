
/// making the map
var myMap = L.map('mapid',{
  center:[39.7128,-120.0059],
  zoom:5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


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


// var maxLongitude ="-69.52148437";
var maxLongitude ="180";


// var minLongitude ="-123.83789062";
var minLongitude ="-180";


// var maxLatitude ="48.74894534";
var maxLatitude ="90";

var minLatitude="-90";

/// function for plotting markers /// wnot sure if i"ll actually7 need this
function makeMarkers(data){ 
  for (var x = 0; x < data.features.length; x++){
    var lat = data.features[x].geometry.coordinates[1];
    var lon = data.features[x].geometry.coordinates[0];
    L.marker([lat,lon]).addTo(myMap);
  };
}

//  make sure you're follwing these instructions, I may have switch depth and magnitutde on some of the asks:

// "Your data markers should reflect the magnitude of the
// earthquake by their size and and depth of the earth quake by
// color. Earthquakes with higher magnitudes should appear
// larger and earthquakes with greater depth should appear darker in color."


//// pass in a list and a number within the list and it will return RGB formated gray scale
function bwColorScale(list,unit){

  //// returns the max magnitude 
  var max = Math.max.apply(Math,list); 
  var min = Math.min.apply(Math,list);

  if (min < 0){console.log(min)};
  
  var colorVar = parseInt(((unit-min)/(max-min)*255));
return `rgb(${colorVar},${colorVar},${colorVar})`;

};




////// function that creates circles and adds them to the map
////// should I make this a layer instead of just adding them all to the map individually
function makeCircles(data){


  /// sorts the features by magnitude 
  var features = data.features.sort(function(a,b){
    return b.properties.mag - a.properties.mag;
  });

  // console.log(features);

  /// list of depths
  var depth_list = features.map(x => x.geometry.coordinates[2])


  // //// returns the min and max depths
  // var maxDepth = Math.max.apply(Math,depth_list);
  // var minDepth = Math.min.apply(Math,depth_list);
  
  // //// creates a list of all the magnitudes
  // var mag_list = features.map(x => x.properties.mag);

  // //// returns the min and max magnitude 
  // var maxMagnitude = Math.max.apply(Math,mag_list);
  // var minMagnitude = Math.min.apply(Math,mag_list);


  for (var x = 0; x < features.length; x++){


    /// maybe define these variables outside the function and pass them into the function since we'll use them for multiple functions????
    var lat = features[x].geometry.coordinates[1];
    var lon = features[x].geometry.coordinates[0];
    var depth = features[x].geometry.coordinates[2];

    var property = features[x].properties;

    var magnitude = features[x].properties.mag;

    // console.log(property);

    // console.log(magnitude)

    //// use the black and white color scale function to return RGB string 
    var colorVar = bwColorScale(depth_list,depth_list[x]);

    L.circle([lat,lon],{
      fillOpacity: .75,
      //// need to change this color based on the size of the circle?
      color: colorVar,
      radius: magnitude * 50000
    }).bindPopup(
      '<h3> Magnitude: </h3>'+magnitude+'<br>'+
      '<h3> Depth: </h3>'+depth+'<br>'+
      '<h3> Place: </h3>'+property.place
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
  // console.log(data);


  // function makeQuakes (features){

  //   function eachFeat (feature,layer){

  //   }

  // };


});





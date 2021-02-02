
//  NOTE:
// dates and times returned by Mapbox APIs are represented in RFC 3339 format,

// /// making the map
// var myMap = L.map('mapid',{
//   center:[39.7128,-120.0059],
//   zoom:5
// });


// Adding tile layer
var titleLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

var startTime ="2014-01-01";

var endTime="2014-01-02";


var maxLongitude ="-69.52148437";
// var maxLongitude ="180";

var minLongitude ="-123.83789062";
// var minLongitude ="-180";

var maxLatitude ="48.74894534";
// var maxLatitude ="90";
 
var minLatitude="25";
// var minLatitude="-90";

/// function for plotting markers /// wnot sure if i"ll actually7 need this
function makeMarkers(data){ 
  var markerList =[];
  for (var x = 0; x < data.features.length; x++){
    var lat = data.features[x].geometry.coordinates[1];
    var lon = data.features[x].geometry.coordinates[0];
    // L.marker([lat,lon]).addTo(myMap
    markerList.push(L.marker([lat,lon]));
  };

  return L.layerGroup(markerList);
}




//// pass in a list and a number within the list and it will return RGB formated gray scale
function bwColorScale(list,unit){

  //// returns the max magnitude 
  var max = Math.max.apply(Math,list); 
  var min = Math.min.apply(Math,list);

  /// creating a list of 255 incrementing numbers with the index inverted,
  var colorKeys = [];
  for (var i = 0; i < 256; i++){
    colorKeys.push(i);
  };
  colorKeys = colorKeys.reverse();

 
  //  uses the instance in the list, max of the list and min of the list to scale to the RGB 0 to 255 scale. The colorKeys.indexOf reverses the order of the scale
  var colorVar = colorKeys.indexOf(parseInt(((unit-min)/(max-min)*255))); // lighter
  // var colorVar =parseInt(((unit-min)/(max-min)*255)); // darker


  var r =  colorVar;
  console.log(r);
  var g = colorVar;
  console.log(g);
  var b = 180;
  console.log(b);
  return `rgb(${r},${g},${b})`;

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

  /// list of circles we'll be using to make layer group
  var circles = [];
  //loop thru features
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

    
    circles.push(L.circle([lat,lon],{
      fillOpacity: .75,
      //// RGB white
      // color: 'rgb(250,250,250)',

      /// RGB Black
      // color: 'rgb(0,0,0)',

      color: colorVar,
      radius: magnitude * 50000
    }).bindPopup(
      '<h3> Magnitude: </h3>'+magnitude+'<br>'+
      '<h3> Depth: </h3>'+depth+'<br>'+
      '<h3> Place: </h3>'+property.place
    ));

  }

  // console.log(circles); 

  return L.layerGroup(circles);

}



//// query 
d3.json(queryUrl+"&starttime="+startTime+"&endtime="+endTime+"&maxlongitude="+maxLongitude+"&minlongitude="+minLongitude+"&maxlatitude="+maxLatitude+"&minlatitude="+minLatitude, function(data){
  // console.log(data);


  ///// idk about this i just needed a blank map layer in here for the code to work for some reason
  var blankMaps = {
    // title:titleLayer
  };



  var overlayMaps ={
    Markers:makeMarkers(data),
    Circles:makeCircles(data)
  };



  /// making the map
  var myMap = L.map('mapid',{
  center:[39.7128,-120.0059],
  zoom:5,
  layers:[titleLayer]
  });


  L.control.layers(blankMaps,overlayMaps).addTo(myMap);

  
});





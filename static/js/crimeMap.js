console.log("loading crimeMap.js");

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
});
 
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  BATTERY: new L.LayerGroup(),
  HOMICIDE: new L.LayerGroup(),
  ASSAULT: new L.LayerGroup(),
  ROBBERY: new L.LayerGroup(),
  SEX_OFFENSE: new L.LayerGroup(),
  HeatMap: new L.LayerGroup(),
  Districts: new L.LayerGroup()
};

//my map and layers 
var myMap = L.map("map-id", {
  center: [41.8781, -87.6298],
  zoom: 13,
  layers: [
    darkmap,
    layers.HeatMap
  ]
});

// Only one base layer can be shown at a time
var baseMaps = {
  Street: streetmap,
  Dark: darkmap
};

// HEAT MAP
d3.json("/showData").then(function (data) {
  // console.log(data);

  var heatArray = []

  for (var i = 0; i < data.length; i++) {
    var lat = data[i].latitude;
    var lng = data[i].longitude;

    if(typeof lat != 'number' || typeof lng != 'number')
      continue;

    var location = [lat,lng];
    //console.log(location);

    heatArray.push(location);
    //console.log(heatArray);
  }
  //console.log(heatArray.map((x, i) => [i, typeof x[0] != 'number' || typeof x[1] != 'number']).filter(x => x[1]).map(x => x[0]));
  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 25,
  }).addTo(layers.HeatMap);
});

// Create an overlays object to add to the layer control
var overlays = {
  "Heat Map": layers.HeatMap,
  "Districts": layers.Districts,
  "BATTERY": layers.BATTERY,
  "HOMICIDE": layers.HOMICIDE,
  "ASSAULT": layers.ASSAULT,
  "ROBBERY": layers.ROBBERY,
  "SEX_OFFENSE": layers.SEX_OFFENSE 
};

//BATTERY Fillter
d3.json("/showData").then(function (data) {
  // console.log(data);

  //filter for types of crime 
  function batteryType(battery) {
    return battery.primary_type == "BATTERY"
  }
  var crBattery = data.filter(batteryType);
  // console.log(crBattery);

  for (var i = 0; i < crBattery.length; i++) {
    // console.log(crRobbery)
    var lat = crBattery[i].latitude;
    var lng = crBattery[i].longitude;
    var type = crBattery[i].primary_type
    var district = crBattery[i].district
    var description = crBattery[i].description
    // console.log(type)

    var location = [lat,lng];
    // console.log(location);
      L.marker(location)
      .bindPopup("<h4>" + type +  "</h4> <hr> <h5>District:" + district + "</h5>" + "<h5>Description: " + description + "</h5>")
      .addTo(layers.BATTERY);
  };
});


// HOMICIDE Fillter
d3.json("/showData").then(function (data) {
  function homiciedType(homicied) {
    return homicied.primary_type == "HOMICIDE"
  }
  var crHomicied = data.filter(homiciedType);
  // console.log(crHomicied);

  for (var i = 0; i < crHomicied.length; i++) {
    // console.log(crRobbery)
    var lat = crHomicied[i].latitude;
    var lng = crHomicied[i].longitude;
    var type = crHomicied[i].primary_type
    var district = crHomicied[i].district
    var description = crHomicied[i].description
    // console.log(type)

    var location = [lat,lng];
    // console.log(location);
      L.marker(location)
      .bindPopup("<h4>" + type +  "</h4> <hr> <h5>District:" + district + "</h5>" + "<h5>Description: " + description + "</h5>")
      .addTo(layers.HOMICIDE);
  };
});

// ASSAULT Fillter 
d3.json("/showData").then(function (data) {
  function assaultType(assault) {
    return assault.primary_type == "ASSAULT"
  }
  var crAssault = data.filter(assaultType);
  // console.log(crAssault);

  for (var i = 0; i < crAssault.length; i++) {
    // console.log(crRobbery)
    var lat = crAssault[i].latitude;
    var lng = crAssault[i].longitude;
    var type = crAssault[i].primary_type
    var district = crAssault[i].district
    var description = crAssault[i].description
    // console.log(type)

    var location = [lat,lng];
    // console.log(location);
      L.marker(location)
      .bindPopup("<h4>" + type +  "</h4> <hr> <h5>District:" + district + "</h5>" + "<h5>Description: " + description + "</h5>")
      .addTo(layers.ASSAULT);
  };
});

// ROBBERY FILLTER
d3.json("/showData").then(function (data) {
  function robberyType(robbery) {
      
    return robbery.primary_type == "ROBBERY"
  }
  // ROBBERY markers
  var crRobbery = data.filter(robberyType);
  // console.log(crRobbery);

    for (var i = 0; i < crRobbery.length; i++) {
      // console.log(crRobbery)
      var lat = crRobbery[i].latitude;
      var lng = crRobbery[i].longitude;
      var type = crRobbery[i].primary_type
      var district = crRobbery[i].district
      var description = crRobbery[i].description
      // console.log(crRobbery.length)

      var location = [lat,lng];
      // console.log(location);
        L.marker(location)
        .bindPopup("<h4>" + type +  "</h4> <hr> <h5>District:" + district + "</h5>" + "<h5>Description: " + description + "</h5>")
        .addTo(layers.ROBBERY);
    };
  });

// SEX_OFFENSE fillter 
d3.json("/showData").then(function (data) {

  function sex_offenseType(sex_offense) {
    return sex_offense.primary_type == "SEX OFFENSE"
  }
  var crSex_offens = data.filter(sex_offenseType);
  // console.log(crSex_offens);

 
  for (var i = 0; i < crSex_offens.length; i++) {
    // console.log(crRobbery)
    var lat = crSex_offens[i].latitude;
    var lng = crSex_offens[i].longitude;
    var type = crSex_offens[i].primary_type
    var district = crSex_offens[i].district
    var description = crSex_offens[i].description
    // console.log(crSex_offens.length)

     

    var location = [lat,lng];
    // console.log(location);
      L.marker(location)
      .bindPopup("<h4>" + type +  "</h4> <hr> <h5>District:" + district + "</h5>" + "<h5>Description: " + description + "</h5>")
      .addTo(layers.SEX_OFFENSE);
  };
});


 //icon filters
// var blueIcon = new L.Icon({
// 	iconUrl: 'img/marker-icon-2x-blue.png',
// 	shadowUrl: 'img/marker-shadow.png',
// 	iconSize: [25, 41],
// 	iconAnchor: [12, 41],
// 	popupAnchor: [1, -34],
// 	shadowSize: [41, 41]
// });

// var redIcon = new L.Icon({
// 	iconUrl: 'img/marker-icon-2x-red.png',
// 	shadowUrl: 'img/marker-shadow.png',
// 	iconSize: [25, 41],
// 	iconAnchor: [12, 41],
// 	popupAnchor: [1, -34],
// 	shadowSize: [41, 41]
// });

// var greenIcon = new L.Icon({
// 	iconUrl: 'img/marker-icon-2x-green.png',
// 	shadowUrl: 'img/marker-shadow.png',
// 	iconSize: [25, 41],
// 	iconAnchor: [12, 41],
// 	popupAnchor: [1, -34],
// 	shadowSize: [41, 41]
// });

// var orangeIcon = new L.Icon({
// 	iconUrl: 'img/marker-icon-2x-orange.png',
// 	shadowUrl: 'img/marker-shadow.png',
// 	iconSize: [25, 41],
// 	iconAnchor: [12, 41],
// 	popupAnchor: [1, -34],
// 	shadowSize: [41, 41]
// });

// var yellowIcon = new L.Icon({
// 	iconUrl: 'img/marker-icon-2x-yellow.png',
// 	shadowUrl: 'img/marker-shadow.png',
// 	iconSize: [25, 41],
// 	iconAnchor: [12, 41],
// 	popupAnchor: [1, -34],
// 	shadowSize: [41, 41]
// });

// var violetIcon = new L.Icon({
// 	iconUrl: 'img/marker-icon-2x-violet.png',
// 	shadowUrl: 'img/marker-shadow.png',
// 	iconSize: [25, 41],
// 	iconAnchor: [12, 41],
// 	popupAnchor: [1, -34],
// 	shadowSize: [41, 41]
// });

//example
// L.marker([51.5, -0.09], {icon: greenIcon}).addTo(myMap);

// Create a control for our layers, add our overlay layers to it
L.control.layers(baseMaps, overlays).addTo(myMap);


//Shapefile of the police districts

var link = "static/geo_data/chicago_police_districts.geojson"

// Function that will determine the color of a police district 
function chooseColor(dist_num) {
  switch (dist_num) {
  case "1":
    return "yellow";
  case "2":
    return "red";
  case "3":
    return "orange";
  case "4":
    return "lightyellow";
  case "5":
    return "acidgreen";
  case "6":
    return "purple";
  case "7":
    return "brown";
  case "8":
    return "red";
  case "9":
    return "orange";
  case "10":
    return "green";
  case "11":
    return "purple";
  case "12":
    return "pink";
  case "13":
    return "gold";
  case "14":
    return "turquoise";
  case "15":
    return "lime";
  case "16":
    return "maroon";
  case "17":
    return "navy";
  case "18":
    return "coral";
  case "19":
    return "teal";
  case "20":
    return "sapphire";
  case "21":
    return "sky";
  case "22":
    return "lightblue";
  case "23":
    return "straw";
  case "24":
    return "silver";
  case "25":
    return "white";
  case "31":
    return "indigo";
  default:
    return "black";
  }
}

// Grabbing our GeoJSON data..
d3.json(link).then(function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    function(feature, latlng) {
      return L.circleMarker(latlng);
  },
    // Style each feature 
    style: function(features) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our district 
        //fillColor: chooseColor(features.properties.dist_num),
        fillColor:'red',
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(features, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h3> District <hr>" + features.properties.dist_num + "</h1>" );

    }
  }).addTo(layers.Districts);
});
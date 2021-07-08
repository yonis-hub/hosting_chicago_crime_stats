// Development for the sunburst chart visualizing the number of each crime type 
// and the amount of arrests made for each

d3.json("/arrestChartData", function(data){
console.log(data); 

// Function to enable groupBy function
function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}

// GroupBy on primary type
var primaryTypes = groupBy(data, crime => crime.primary_type);

// Homicide stats
var homicide = primaryTypes.get("HOMICIDE");
var numberHomicide = homicide.length;
var numHomicideArrest = groupBy(homicide, arrest => arrest.arrest).get(true).length;
var numHomicideNoArrest = groupBy(homicide, arrest => arrest.arrest).get(false).length;

// Battery stats
var battery = primaryTypes.get("BATTERY")
var numberBattery = battery.length;
var numBatteryArrest = groupBy(battery, arrest => arrest.arrest).get(true).length;
var numBatteryNoArrest = groupBy(battery, arrest => arrest.arrest).get(false).length;

// Assault stats
var assault = primaryTypes.get("ASSAULT")
var numberAssault = assault.length;
var numAssaultArrest = groupBy(assault, arrest => arrest.arrest).get(true).length;
var numAssaultNoArrest = groupBy(assault, arrest => arrest.arrest).get(false).length;

// Robbery stats
var robbery = primaryTypes.get("ROBBERY")
var numberRobbery = robbery.length;
var numRobberyArrest = groupBy(robbery, arrest => arrest.arrest).get(true).length;
var numRobberyNoArrest = groupBy(robbery, arrest => arrest.arrest).get(false).length;

// Sex Offense stats
var so = primaryTypes.get("SEX OFFENSE")
var numberSO = so.length;
var numSOArrest = groupBy(so, arrest => arrest.arrest).get(true).length;
var numSONoArrest = groupBy(so, arrest => arrest.arrest).get(false).length;

// Building the Sunburst
var arrestSunburst = [{
  type: "sunburst",
  ids: ["Homicide", "Homicide Arrest = True", "Homicide Arrest = False", 
  "Battery", "Battery Arrest = True", "Battery Arrest = False",
  "Assault", "Assault Arrest = True", "Assault Arrest = False",
  "Robbery", "Robbery Arrest = True", "Robbery Arrest = False",
  "Sex Offense", "Sex Offense Arrest = True", "Sex Offense Arrest = False"],
  labels: ["Homicide", "Arrested", "Not Arrested", 
  "Battery", "Arrested", "Not Arrested",
  "Assault", "Arrested", "Not Arrested",
  "Robbery", "Arrested", "Not Arrested",
  "Sex Offense", "Arrested", "Not Arrested"],
  parents: ["", "Homicide", "Homicide", "", "Battery", "Battery", "", "Assault", "Assault", 
  "", "Robbery", "Robbery", "", "Sex Offense", "Sex Offense"],
  values:  [numberHomicide, numHomicideArrest, numHomicideNoArrest, numberBattery, numBatteryArrest, 
  numBatteryNoArrest, numberAssault, numAssaultArrest, numAssaultNoArrest, numberRobbery, numRobberyArrest, 
  numRobberyNoArrest, numberSO, numSOArrest, numSONoArrest],
  textfont: {size: 20},
  leaf: {opacity: 0.4},
  marker: {line: {width: 1}, colorscale: "Blues"},
  branchvalues: "total",
  textposition: "inside",
  insidetextorientation: "radial"
}];

var layout = {
  margin: {l: 0, r: 0, b: 40, t: 0},
  width: 750,
  height: 750
};


Plotly.newPlot('arrestChart', arrestSunburst, layout)

});

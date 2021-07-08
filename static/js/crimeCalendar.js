//d3.json("/crimeCalendar").then((data) => {console.log(data);});
function getChartData(data, type) {
      var dates = [];
      var crimes = [];
      for (var date in data) {
            dates.push(new Date(date));
            crimes.push(data[date][type]);
      }
      return {dates,crimes};
}
d3.json("/crimeCalendar", function (data) {
      // console.log(data);
      data.sort((a,b) => new Date(a.date) - new Date(b.date));
      var accumulator = {};
      for (var i = 0; i < data.length; i++) {
            const current = data[i];
            const date = current.date;
            const type = current.primary_type;
            if (!accumulator.hasOwnProperty(date))
                  accumulator[date] = {};
            const thing = accumulator[date];
            if (thing.hasOwnProperty(type)) {
                  thing[type]++;
            }
            else
                  thing[type] = 1;
      }
      //Assault
      var response = getChartData(accumulator, "ASSAULT");
      var dates1 = response.dates;
      var crimes1 = response.crimes;
      //Robbery
      response = getChartData(accumulator, "ROBBERY");
      var dates2 = response.dates;
      var crimes2 = response.crimes;
      // console.log(accumulter);
    //Homicide
    response = getChartData(accumulator, "HOMICIDE");
      var dates3 = response.dates;
      var crimes3 = response.crimes;
    
      //Battery
      response = getChartData(accumulator, "BATTERY");
      var dates4 = response.dates;
      var crimes4 = response.crimes;

      //Sex Offense
      response = getChartData(accumulator, "SEX OFFENSE");
      var dates5 = response.dates;
      var crimes5 = response.crimes;

      var trace1 = {
            x: dates1,
            y: crimes1,
            name: "Assault",
            type: "line"
    
          };
          var trace2 = {
            x: dates2,
            y: crimes2,
            name: "Robbery",
            type: "line"
    
          };

          var trace3 = {
            x: dates3,
            y: crimes3,
            name: "Homicide",
            type: "line"

          };

          var trace4 = {
            x: dates4,
            y: crimes4,
            name: "Battery",
            type: "line"

          };

          var trace5 = {
            x: dates5,
            y: crimes5,
            name: "Sex Offense",
            type: "line"
          };

      var data = [trace1, trace2, trace3, trace4, trace5];
      
    //create layout for line graph
    var layout = {
        title: "Violent Crimes in Chicago 2021"
    };
    Plotly.newPlot("line", data, layout); 
});






// //d3.json("/crimeCalendar").then((data) => {console.log(data);});

// d3.json("/crimeCalendar", function (crime_data){
    
//     console.log(crime_data);
//     var date = crime_data.map(obj => obj.date);
//     console.log(date);
//     var primary_type = crime_data.map(obj => obj.primary_type);
//     console.log(primary_type);
//     // crime_data =[];
//     // for (i=0; i < date.length; i++) {
//     //     var crime={};
//     //     crime[date[i]] = date[i];
//     //     crime[p]

//    // }
    
//     //create primary type graph
//     var data = [{
//                 values: date,
//                 labels: primary_type,
//                 type: "pie"
        
//             }];
        
//         //     //create layout for line graph
//             var layoutLine = {
//                  title: "Violent Crimes in Chicago",
//                  height: 400, 
//                  width: 500

//             };
        
//             Plotly.newPlot("line", data, layoutLine); 

// });
// //define variables

// // function createLineGraph(id) {
// //     d3.json("/crimeCalendar").then((data) => {
// //     var date = data.date
// //     var primary_type = data.primary_type
// // //     var homicide = 
// // //     var battery = 
// // //     var assult = 
// // //     var robbery = 
// // //     var sex_offense = 

// // // //Display the default plot: Overall violent crime in Chicago
// // // function init () {
// //     var data = [{
// //         x: date,
// //         y: primary_type,
// //         type: "line"

// //     }];

// // //     //create layout for line graph
// //     var layoutLine = {
// //          title: "Violent Crimes in Chicago"
// //     };

// //     plotly.newPlot("line", data, layoutLine); 
// //  });

// // // function getData() {
// // //     var dropdownMenu 

// // //     var data = [];

// // //     if (dataset == 'date') {
// // //         data = date; 
// // //     }

// // //     else if (dataset == 'homicide') {
// // //         data = homicide; 
// // //     }

// // //     else if (dataset == 'battery') {
// // //         data = battery; 
// // //     }

// // //     else if (dataset == 'assult') {
// // //         data = assult; 
// // //     }

// // //     else if (dataset == 'robbery') {
// // //         data = robbery; 
// // //     }

// // //     else if (dataset == 'homicide') {
// // //         data = homicide; 
// // //     }

// // // //call function to update the chart
// // // updatePlotly(data); 
 
// // // //update the plot values
// // // function updatePlotly(newdata) {
// // // 	Plotly.restyle(“line”, “values”, [newdata]);
// // // }


// /*--------------------------Bar chart with X axis variable dropdown--------------------------------*/
//         //update line look at: https://codepen.io/plotly/pen/xwBNXa

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from comic-characters_marvel-wikia-data.csv
d3.csv("comic-characters_marvel-wikia-data.csv").then(function(data) {

  console.log(data);

  // Cast the APPEARANCES value to a number for each piece of data
  data.forEach(function(d) {
    d.APPEARANCES = +d.APPEARANCES;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(data.map(d => d.HAIR))
    .range([0, chartWidth])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.APPEARANCES)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of data
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.HAIR))
    .attr("y", d => yLinearScale(d.APPEARANCES))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.APPEARANCES));

}).catch(function(error) {
  console.log(error);
});

// /*--------------------------Bar chart with X axis variable dropdown--------------------------------*/
//         //update line look at: https://codepen.io/plotly/pen/xwBNXa

// // Define SVG area dimensions
// var svgWidth = 960;
// var svgHeight = 660;

// // Define the chart's margins as an object
// var chartMargin = {
//   top: 30,
//   right: 30,
//   bottom: 30,
//   left: 30
// };

// // Define dimensions of the chart area
// var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
// var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// // Select body, append SVG area to it, and set the dimensions
// var svg = d3.select("body")
//   .append("svg")
//   .attr("height", svgHeight)
//   .attr("width", svgWidth);

// // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// // Load data from comic-characters_marvel-wikia-data.csv
// d3.csv("comic-characters_marvel-wikia-data.csv").then(function(data) {

//   console.log(data);

//   // Cast the APPEARANCES value to a number for each piece of data
//   data.forEach(function(d) {
//     d.APPEARANCES = +d.APPEARANCES;
//   });

//   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
//   var xBandScale = d3.scaleBand()
//     .domain(data.map(d => d.EYE))
//     .range([0, chartWidth])
//     .padding(0.1);

//   // Create a linear scale for the vertical axis.
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(data, d => d.APPEARANCES)])
//     .range([chartHeight, 0]);

//   // Create two new functions passing our scales in as arguments
//   // These will be used to create the chart's axes
//   var bottomAxis = d3.axisBottom(xBandScale);
//   var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

//   // Append two SVG group elements to the chartGroup area,
//   // and create the bottom and left axes inside of them
//   chartGroup.append("g")
//     .call(leftAxis);

//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${chartHeight})`)
//     .call(bottomAxis);

//   // Create one SVG rectangle per piece of data
//   // Use the linear and band scales to position each rectangle within the chart
//   chartGroup.selectAll(".bar")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", d => xBandScale(d.EYE))
//     .attr("y", d => yLinearScale(d.APPEARANCES))
//     .attr("width", xBandScale.bandwidth())
//     .attr("height", d => chartHeight - yLinearScale(d.APPEARANCES));

// }).catch(function(error) {
//   console.log(error);
// });

/*--------------------------Bar chart with X axis variable dropdown--------------------------------*/
        //update line look at: https://codepen.io/plotly/pen/xwBNXa

// Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function(err, rows){

//     function unpack(rows, key) {
//         return rows.map(function(row) { return row[key]; });
//     }

// var allCountryNames = unpack(rows, 'country'),
//     allYear = unpack(rows, 'year'),
//     allGdp = unpack(rows, 'gdpPercap'),
//     listofCountries = [],
//     currentCountry,
//     currentGdp = [],
//     currentYear = [];

//   for (var i = 0; i < allCountryNames.length; i++ ){
//     if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
//       listofCountries.push(allCountryNames[i]);
//     }
//   }
  
//   function getCountryData(chosenCountry) {
//     currentGdp = [];
//     currentYear = [];
//     for (var i = 0 ; i < allCountryNames.length ; i++){
//       if ( allCountryNames[i] === chosenCountry ) {
//         currentGdp.push(allGdp[i]);
//         currentYear.push(allYear[i]);
//       } 
//     }
//   };

// // Default Country Data
// setBubblePlot('Afghanistan');
  
// function setBubblePlot(chosenCountry) {
//     getCountryData(chosenCountry);  

//     var trace1 = {
//       x: currentYear,
//       y: currentGdp,
//       mode: 'lines+markers',
//       marker: {
//         size: 12, 
//         opacity: 0.5
//       }
//     };

//     var data = [trace1];

//     var layout = {
//       title: 'GDP per cap according to Country<br>'+ chosenCountry + ' GDP'
//     };

//     Plotly.newPlot('plotdiv', data, layout, {showSendToCloud: true});
// };
  
// var innerContainer = document.querySelector('[data-num="0"'),
//     plotEl = innerContainer.querySelector('.plot'),
//     countrySelector = innerContainer.querySelector('.countrydata');

// function assignOptions(textArray, selector) {
//   for (var i = 0; i < textArray.length;  i++) {
//       var currentOption = document.createElement('option');
//       currentOption.text = textArray[i];
//       selector.appendChild(currentOption);
//   }
// }

// assignOptions(listofCountries, countrySelector);

// function updateCountry(){
//     setBubblePlot(countrySelector.value);
// }
  
// countrySelector.addEventListener('change', updateCountry, false);
// });

// Holly Code for Bubble Charts and Pie Charts
/* Goals for this app:
    Bubble chart - outline complete
    Variable bar chart
    donut charts - outline complete
*/

/*--------------------------Donut chart function--------------------------------*/
// function donutChart(dataSelect, labelsSelect, nameSelect){
//   var data = [{
//       values: dataSelect,
//       labels: labelsSelect,
//       domain: {column: 0},
//       name: nameSelect,
//       hoverinfo: 'label+percent+name',
//       hole: .4,
//       type: 'pie'
//     }];
    
//     var layout = {
//       title: 'Donut chart of '+nameSelect, //update line - ask Falconi to double check calling variables in function
//       annotations: [
//         {
//           font: {
//             size: 20
//           },
//           showarrow: false,
//           text: nameSelect, //update line - ask Falconi to double check calling variables in function
//           x: 0.17,
//           y: 0.5
//         }
//       ],
//       height: 400,
//       width: 600,
//       showlegend: false,
//     };
    
//     Plotly.newPlot('myDiv', data, layout);
// };

// /*--------------------------Main function--------------------------------*/
// // Function for change on dropdown menu
// function optionChanged(alignment){

//   // Check if value is selected in dropdown
//   console.log(alignment);

//   // Read the json file for the data
//   d3.json("data.csv").then((data) => { //update line to call data

//   // Clears dropdown
//   d3.select("#selDataset").html("");   
  
//   // Select the metadata array and for each item append the item ID and adds ID to dropdown
//   data.metadata.forEach(item =>
//        {
//        d3.select ("#selDataset").append('option').attr('value', item.align).text(item.align);
//        });
//   // Selected value is passed
//   d3.select("#selDataset").node().value = alignment;
  
//   // Filter Metadata for selected ID from dropdown
//   const idMetadata = data.metadata.filter(item=> (item.align == alignment));

//   // Check the metadata loaded for the selected ID
//   console.log(idMetadata);
  
//   const panelDisplay = d3.select("#sample-metadata"); // update line with HTML
//   panelDisplay.html("");
//   Object.entries(idMetadata[0]).forEach(item=> 
//      {
//         panelDisplay.append("p").text(`${item[0]}: ${item[1]}`) //update line
//      });

//   // Filter sample array data for the selected ID
//   const idSample = data.samples.filter(item => parseInt(item.align) == alignment); 

//   /*--------------------------Bubble chart--------------------------------*/

//   // For alignment, find # of appearances and first year
//   var appearances1 =idSample[0].FIRST_APPEARANCE; //update line
//   var firstYear= idSample[0].Year; //update line

//   // Define the layout and trace object, edit color and orientation
//   const trace1 = {
//       x: firstYear,
//       y: appearances1,
//       mode: 'markers',
//       marker: {
//           color: firstYear,
//           size: appearances1
//       }
//   },

//   layout1 = {
//       title: '<b>Bubble Chart For Appearances</b>',
//       xaxis: {title: 'Year Characters Appear'},
//       yaxis: {title: 'Number of Appearances'},
//       showlegend: false,
//       height: 800,
//       width: 1800
//       };
  
//   // Plot using Plotly
//   Plotly.newPlot('bubble', [trace1], layout1);

// /*--------------------------Bar chart with X axis variable dropdown--------------------------------*/
//       //update line look at: https://codepen.io/plotly/pen/xwBNXa


// /*--------------------------Donut charts--------------------------------*/
// // Donut chart variables function donutChart(dataSelect, labelsSelect, nameSelect)

//   Function donutInfo():
//   //Hair variables
//       hairInfo = item.hair//update line*
//       var hairValue = hairInfo.length //update line*
//       var hairLabels = hairInfo
//       var hairName = 'Hair'

//   //Sex variables 
//       sexInfo = item.sex//update line*
//       var sexValue = sexInfo.count //update line*
//       var sexLabels = sexInfo
//       var sexName = 'Sex'

//   //Eye color variables 
//       eyeInfo = item.eye//update line*
//       var eyeValue = eyeInfo.count //update line*
//       var eyeLabels = eyeInfo
//       var eyeName = 'Eye'

//   //Identity variables 
//       idInfo = idem.id //update line*
//       var idValue = idInfo.count //update line*
//       var idLabels = idInfo
//       var idName = 'Identity'

//   //Donut functions
//       donutChart(hairValue, hairLabels, hairName);
//       donutChart(sexValue, sexLabels, sexName);
//       donutChart(eyeValue, eyeLabels, eyeName);
//       donutChart(idValue, idLabels, idName);

//   //update line - Put donut charts into HTML
//       //https://www.d3-graph-gallery.com/graph/donut_basic.html
          

//   )};

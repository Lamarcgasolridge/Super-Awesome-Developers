// // Trace1 for the Greek Data
// var trace1 = {
//     x: data.map(row => row.name),
//     y: data.map(row => row.APPEARANCES),
//     text: data.map(row => row.name),
//     name: "Characters",
//     type: "bar"
//   };
  
// //   // Trace 2 for the Roman Data
// // //   var trace2 = {
// // //     x: data.map(row => row.pair),
// // //     y: data.map(row => row.romanSearchResults),
// // //     text: data.map(row => row.romanName),
// // //     name: "Roman",
// // //     type: "bar"
// // //   };
  
//   // Combining both traces
//   var traceData = [trace1]; //, trace2];
  
//   // Apply the group barmode to the layout
//   var layout = {
//     title: "Greek vs Roman gods search results",
//     barmode: "group"
//   };
  
//   // Render the plot to the div tag with id "plot"
//   Plotly.newPlot("plot", traceData, layout);

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
    .domain(data.map(d => d.EYE))
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
    .attr("x", d => xBandScale(d.EYE))
    .attr("y", d => yLinearScale(d.APPEARANCES))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.APPEARANCES));

}).catch(function(error) {
  console.log(error);
});
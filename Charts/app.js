/* Goals for this app:
    Bubble chart - outline complete
    Variable bar chart
    donut charts - outline complete
*/

/*--------------------------Donut chart function--------------------------------*/
function donutChart(dataSelect, labelsSelect, nameSelect){
    var data = [{
        values: dataSelect,
        labels: labelsSelect,
        domain: {column: 0},
        name: nameSelect,
        hoverinfo: 'label+percent+name',
        hole: .4,
        type: 'pie'
      }];
      
      var layout = {
        title: 'Donut chart of '+nameSelect, //update line - ask Falconi to double check calling variables in function
        annotations: [
          {
            font: {
              size: 20
            },
            showarrow: false,
            text: nameSelect, //update line - ask Falconi to double check calling variables in function
            x: 0.17,
            y: 0.5
          }
        ],
        height: 400,
        width: 600,
        showlegend: false,
      };
      
      Plotly.newPlot('myDiv', data, layout);
};

/*--------------------------Main function--------------------------------*/
 // Function for change on dropdown menu
 function optionChanged(alignment){

    // Check if value is selected in dropdown
    console.log(alignment);
 
    // Read the json file for the data
    d3.json("data/samples.json").then((data) => { //update line to call data
 
    // Clears dropdown
    d3.select("#selDataset").html("");   
    
    // Select the metadata array and for each item append the item ID and adds ID to dropdown
    data.metadata.forEach(item =>
         {
         d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
         });
    // Selected value is passed
    d3.select("#selDataset").node().value = alignment;
    
    // Filter Metadata for selected ID from dropdown
    const idMetadata = data.metadata.filter(item=> (item.id == alignment));

    // Check the metadata loaded for the selected ID
    console.log(idMetadata);
    
    const panelDisplay = d3.select("#sample-metadata");
    panelDisplay.html("");
    Object.entries(idMetadata[0]).forEach(item=> 
       {
          panelDisplay.append("p").text(`${item[0]}: ${item[1]}`) //update line
       });

    // Filter sample array data for the selected ID
    const idSample = data.samples.filter(item => parseInt(item.align) == alignment); 

    /*--------------------------Bubble chart--------------------------------*/
 
    // Remove Sample value and otuID from individual
    var appearances1 =idSample[0].sample_values; //update line
    var firstYear= idSample[0].otu_ids; //update line
 
    // Define the layout and trace object, edit color and orientation
    const trace1 = {
        x: firstYear,
        y: appearances1,
        mode: 'markers',
        marker: {
            color: firstYear,
            size: appearances1
        }
    },
 
    layout1 = {
        title: '<b>Bubble Chart For Appearances</b>',
        xaxis: {title: 'Year Characters Appear'},
        yaxis: {title: 'Number of Appearances'},
        showlegend: false,
        height: 800,
        width: 1800
        };
    
    // Plot using Plotly
    Plotly.newPlot('bubble', [trace1], layout1);

/*--------------------------Bar chart with X axis variable dropdown--------------------------------*/
        //update line look at: https://codepen.io/plotly/pen/xwBNXa

        
/*--------------------------Donut charts--------------------------------*/
 // Donut chart variables function donutChart(dataSelect, labelsSelect, nameSelect)
    //Hair variables
    hairInfo = //update line, call hair column
    var hairValue = hairInfo.legnth //update line to correct syntax
    var hairLabels = hairInfo
    var hairName = 'Hair'

    //Sex variables 
    sexInfo = //update line, call sex column
    var sexValue = sexInfo.count //update line to correct syntax
    var sexLabels = sexInfo
    var sexName = 'Sex'

    //Eye color variables 
    eyeInfo = //update line, call eye column
    var eyeValue = eyeInfo.count //update line to correct syntax
    var eyeLabels = eyeInfo
    var eyeName = 'Eye'

    //Identity variables 
    idInfo = //update line, call id column
    var idValue = idInfo.count //update line to correct syntax
    var idLabels = idInfo
    var idName = 'Identity'

    //Donut functions
    donutChart(hairValue, hairLabels, hairName);
    donutChart(sexValue, sexLabels, sexName);
    donutChart(eyeValue, eyeLabels, eyeName);
    donutChart(idValue, idLabels, idName);

    //update line - Put donut charts into HTML

    

    )};


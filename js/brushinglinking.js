// Set margins and dimensions 
const margin = { top: 50, right: 75, bottom: 50, left: 150 };
const width = 900 - margin.left - margin.right;
const height =650 - margin.top - margin.bottom;

// Append svg object to the body of the page to house Scatterplot1
const svg1 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

// Initialize brush for Scatterplot1 and points. We will need these to be global. 
let brush1; 
let myCircles1; 

//TODO: append svg object to the body of the page to house Scatterplot2 (call it svg2)
const svg2 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]);

//TODO: Initialize brush for Scatterplot2 and points. We will need these to be global.
let brush2; 
let myCircles2;

//TODO: append svg object to the body of the page to house bar chart 
const svg3 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]);



//TODO: Initialize bars. We will need these to be global. 
let myBars;

// Define color scale
const color = d3.scaleOrdinal()
                .domain(["setosa", "versicolor", "virginica"])
                .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Plotting 
d3.csv("data/iris.csv").then((data) => {
  
  // We will need scales for all of the following charts to be global
  let x1, y1, x2, y2, x3, y3;  

  // We will need keys to be global
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // Scatterplot1
  {
    xKey1 = "Sepal_Length";
    yKey1 = "Petal_Length";

    // Find max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Create X scale
    x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis 
    svg1.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x1))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey1)
      );

    // Find max y 
    maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // Create Y scale
    y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg1.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y1)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey1)
      );

    // Add points
    myCircles1 = svg1.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x1(d[xKey1]))
                              .attr("cy", (d) => y1(d[yKey1]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    //TODO: Define a brush (call it brush1)
    brush1 = d3.brush()
      .extent([[0,0], [width, height]]);

    //TODO: Add brush1 to svg1
    svg1
      .call( brush1
        .on("start", clear)
        .on("brush", updateChart1));


    
  }

  //TODO: Scatterplot 2 (show Sepal width on x-axis and Petal width on y-axis)
  {
    // Scatterplot2 code here 
    xKey2 = "Sepal_Width";
    yKey2 = "Petal_Width";

    // Find max x
    maxX2 = d3.max(data, (d) => { return d[xKey2]; });

    // Create X scale
    x2 = d3.scaleLinear()
                .domain([0,maxX2])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis 
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x2))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey2)
      );

    // Finx max y 
    maxY2 = d3.max(data, (d) => { return d[yKey2]; });

    // Create Y scale
    y2 = d3.scaleLinear()
                .domain([0, maxY2])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y2)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey2)
      );

    // Add points
    myCircles2 = svg2.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x2(d[xKey2]))
                              .attr("cy", (d) => y2(d[yKey2]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    //TODO: Define a brush (call it brush2)
    brush2 = d3.brush()
    
      

    //TODO: Add brush2 to svg2
    svg2.append("g")
      .attr("class", "brush")
      .call(brush2)



}
  

  //TODO: Barchart with counts of different species
  {
    // Bar chart code here 
    // Hardcoded barchart data
    const data1 = [
      {species: 'setosa', count: 50},
      {species: 'versicolor', count: 50},
      {species: 'virginica', count: 50}
    ];

    xKey3 = "Species";
    yKey3 = "Count";

    // Find max x
    let maxX3 = d3.max(data1, function(d) { return d.score; });

    // Create X scale
    x3 = d3.scaleBand()
                .domain(d3.range(data1.length))
                .range([margin.left, width-margin.right]); 
    
 
    // Find max y 
    maxY3 = d3.max(data1, function(d) { return d.count; });

    // Create Y scale
    y3 = d3.scaleLinear()
                .domain([0, maxY3])
                .range([height - margin.bottom, margin.top]); 

    svg3.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(y3)) 
   .attr("font-size", '20px')
   .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top - 10)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey3));
   

    // shifts the scale and ands the ticks of the scale 
    svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(x3) 
            .tickFormat(i => data1[i].species))  
    .attr("font-size", '20px')
    .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey3)
    );


    // Add points
    myBars = svg3.selectAll("bar")
        .data(data1)
        .enter()
        .append("rect")
          .attr("class", "bar") 
          .attr("x", (d,i) => x3(i)) 
          .attr("y", (d) => y3(d.count)) 
          .attr("height", (d) => (height - margin.bottom) - y3(d.count)) 
          .attr("width", x3.bandwidth()) 
          .style("fill", (d) => color(d.species))
          .style("opacity", 0.5);

  }

  //Brushing Code---------------------------------------------------------------------------------------------

  })
  // Call to removes existing brushes 
  function clear() {
      svg1.call(brush1.move, null);
      
      //TODO: add code to clear existing brush from svg2
      svg2.call(brush2.move, null);
    }

  // Call when Scatterplot1 is brushed 
  function updateChart1(brushEvent) {
      
      //TODO: Find coordinates of brushed region 
      let selection = d3.brushSelection(this);

      //TODO: Give bold outline to all points within the brush region in Scatterplot1
      myCircles1.classed("selected", function(d){
        return isBrushed(selection, x1(d.Sepal_Length), y1(d.Petal_Length)) 
      })

  
      //TODO: Give bold outline to all points in Scatterplot2 corresponding to points within the brush region in Scatterplot1
      myCircles2.classed("selected", function(d) { 
        return isBrushed(selection, x1(d.Sepal_Length), y1(d.Petal_Length))
      })
    }
    
  

  // Call when Scatterplot2 is brushed 
  function updateChart2(brushEvent) {
    
    //TODO: Find coordinates of brushed region 
    let selection = d3.brushSelection(this);

    //TODO: Start an empty set that you can store names of selected species in 
    let speciesSelection = new Set();

    //TODO: Give bold outline to all points within the brush region in Scatterplot2 & collected names of brushed species
    myCircles2.classed("selected", function (d) {       
      isSelected = isBrushed(selection, x2(d.Sepal_Width), y2(d.Petal_Width));
      if (isSelected) {
        speciesSelection.add(d.Species);
      }
      return isSelected;
   })
    //TODO: Give bold outline to all points in Scatterplot1 corresponding to points within the brush region in Scatterplot2
    myCircles1.classed("selected", function (d) { 
      return isBrushed(selection, x2(d.Sepal_Width), y2(d.Petal_Width));
   })
    //TODO: Give bold outline to all bars in bar chart with corresponding to species selected by Scatterplot2 brush
    myBars.classed("selected", function (d) { 
      return speciesSelection.has(d.Species);
    })
  }

    //Finds dots within the brushed region
    function isBrushed(brush_coords, cx, cy) {
      if (brush_coords === null) return;

      var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
    };

  ;

function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var url = `metadata/${sample}`;

    d3.json(url).then(function(response) {
      console.log(response)

      // Use d3 to select the panel with id of `#sample-metadata`
      var metapanel = d3.select("#sample-metadata");

      // Use `.html("") to clear any existing metadata
      metapanel.html("");

      // Use the list of sample names to populate the select options
        Object.entries(response).forEach(([key, value]) => {
          console.log(value)
      // Use `Object.entries` to add each key and value pair to the panel
          var li = metapanel.append("li").text(`${key}: ${value}`);
          
          ///////////
          /// THIS IS WHERE YOU WERE
          //////////
          if (key === "WFREQ") {
            var gval = value;
            return gval;
          }

        });
        console.log(gval)

        var gaugepan = d3.select("#gauge");

        var data = [
          {
            domain: { x: [0, 1], y: [0, 1] },
            value: gval,
            title: { text: "Speed" },
            type: "indicator",
            mode: "gauge+number"
          }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('myDiv', data, layout);

      });

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

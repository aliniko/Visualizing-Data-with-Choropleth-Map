// - countyURL points to the freeCodeCamp county map data JSON
// - educationURL points to the freeCodeCamp education data JSON
// - countyData will be used to store an array of data to give to d3 to draw the map
// - educationData will be used to store an array of data to give to d3 to associate education information with the counties
// - canvas is a d3 selection of the svg canvas to reference easily
// - drawMap() is a function that will draw the map, once we have obtained the data

let countyURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
let educationURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let countyData;
let educationData;

let canvas = d3.select("#canvas");
let tooltip = d3.select('#tooltip')

let drawMap = () => {
  canvas
    .selectAll("path")
    .data(countyData)
    .enter()
    .append("path")
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (countyDataItem) => {
      let id = countyDataItem["id"];
      let county = educationData.find((item) => {
        return item["fips"] === id;
      });
      let percentage = county["bachelorsOrHigher"];
      if (percentage <= 15) {
        return "tomato";
      } else if (percentage <= 30) {
        return "orange";
      } else if (percentage <= 45) {
        return "lightgreen";
      } else {
        return "limegreen";
      }
    })
    // 5. My counties should each have "data-fips" and "data-education" properties containing their corresponding fips and education values
    .attr("data-fips", (countyDataItem) => {
      return countyDataItem["id"];
    })
    .attr('data-education', (countyDataItem) => {
        let id = countyDataItem["id"];
        let county = educationData.find((item) => {
          return item["fips"] === id;
        });
        let percentage = county["bachelorsOrHigher"];
        return percentage;
    })
    .on('mouseover', (countyDataItem) => {
      tooltip.transition()
            .style('visibility', 'visible')

          let id = countyDataItem["id"];
          let county = educationData.find((item) => {
          return item["fips"] === id;
        })

        tooltip.text(county['fips'] + '-' + county['area_name'] + ', ' +
          county['state'] + ':' + county['bachelorsOrHigher'] + '%' )

          tooltip.attr('data-education', county['bachelorsOrHigher'])
    })
    .on('mouseout', (countyDataItem) => {
      tooltip.transition()
            .style('visibility', 'hidden')
    })
};

d3.json(countyURL).then((data, error) => {
  if (error) {
    console.log(log);
  } else {
    countyData = topojson.feature(data, data.objects.counties).features;
    console.log("County Data");
    console.log(countyData);
  }
  d3.json(educationURL).then((data, error) => {
    if (error) {
      console.log(log);
    } else {
      educationData = data;
      console.log("Education Data");
      console.log(educationData);
      drawMap();
    }
  });
});

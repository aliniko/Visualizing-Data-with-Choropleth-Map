// - countyURL points to the freeCodeCamp county map data JSON
// - educationURL points to the freeCodeCamp education data JSON
// - countyData will be used to store an array of data to give to d3 to draw the map
// - educationData will be used to store an array of data to give to d3 to associate education information with the counties
// - canvas is a d3 selection of the svg canvas to reference easily
// - drawMap() is a function that will draw the map, once we have obtained the data

let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
let educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'

let countyData
let educationData

let canvas = d3.select('#canvas')

let drawMap = () => {
 
}

d3.json(countyURL).then(
    (data, error) => {
        if(error){
            console.log(log)
        }else {
            countyData = topojson.feature(data, data.objects.counties)
            console.log("County Data")
            console.log(countyData)
        }
        d3.json(educationURL).then(
            (data, error) => {
                if(error){
                    console.log(log)
                }else {
                    educationData = data
                    console.log("Education Data")
                    console.log(educationData)
                    drawMap()
                }
            }
                    )
    }
)
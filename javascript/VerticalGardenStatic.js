// var width = 500;
// var height = 500;
//
// //Create SVG element
// var svg = d3.select("#soil-monitoring")
//             .append("svg")
//             .attr("width", width)
//             .attr("height", height);
//
// //Create group element
// var g = svg.append("g")
//            .attr("transform", function(d, i) {
//                     return "translate(0,0)";
//            });
//
// //Create and append ellipse element into group
// var ellipse = g.append("ellipse")
//                .attr("cx", 250)
//                .attr("cy", 50)
//                .attr("rx", 150)
//                .attr("ry", 50)
//                .append("text")
//
//
//
//
// //Create and append text element into group
// g.append("text")
//  .attr("x", 150)
//  .attr("y", 50)
//  .attr("stroke", "#fff")
//  .text("This is an ellipse!");

 var svgDocument;

 function on_load(evt){
    O=evt.target;
    svgDocument=O.ownerDocument;

        //this goes inside on_load(evt) function!
    svgDocument.getElementById("button").onclick = user_clicked_my_button;
 }

 function turn_on(id){
    svgDocument.getElementById(id).setAttribute("visibility","visible");
 }

 function turn_off(id){
    svgDocument.getElementById(id).setAttribute("visibility","hidden");
 }

setTimeout(function() {
   console.log('first 10 secs');
   getESPAirReadings();

   setInterval(function() {
         console.log('60 secs has passed');
         getESPAirReadings();
   }, 60000);

}, 10000);
console.log('page loaded');

 async function getESPAirReadings()
 {

   console.log("Running getESPAirReadings function");

   const api_url = "https://api.thingspeak.com/channels/1745276/feeds/last.json\?api_key\=SM9VUL5FRXNCB5FS";
   // Making a GET request using an axios instance from a connected library
   // axios.get(`${api_url}`).then(response => {console.log(response.data.name);}).catch(error => console.error('Error', error))

   let res = await axios.get(`${api_url}`);

   let data = res.data;
   console.log(data.name);

   sensor_readings = ""

   sensor_readings += "Last Update, \t\t\t" + data.created_at + "<br>";
   sensor_readings += "Temperature,\t\t\t" + Math.round(data.field1*10)/10 + "°C <br>";
   sensor_readings += "Pressure,\t\t\t" + Math.round(data.field2*10)/10 + "hPa";
   sensor_readings += "Soil Moisture,\t\t\t" + Math.round(data.field3*10)/10 + "%\t";
   sensor_readings += Math.round(data.field4*10)/10 + "%\t";
   sensor_readings += Math.round(data.field5*10)/10 + "%\t";
   sensor_readings += Math.round(data.field6*10)/10 + "%\t <br>";

   console.log(sensor_readings)
   updateSVG(data)
   // document.getElementById("ESPdemo").innerHTML = sensor_readings
 }

 function updateSVG(data)
 {
   console.log(data);

    var elem = document.getElementById("svg-object");
    var doc = elem.getSVGDocument();

    var row_1_temperature = doc.getElementById("temperature-value-1");
    var row_3_temperature = doc.getElementById("temperature-value-3");
    var row_5_temperature = doc.getElementById("temperature-value-5");
    var row_7_temperature = doc.getElementById("temperature-value-7");
    var air_pressure_value = doc.getElementById("air-pressure-value");
    var air_temperature_value = doc.getElementById("air-temperature-value");

    air_pressure_value.textContent = Math.round(data.field2*10)/10 + "hPa";
    air_pressure_value.style="font-size:9px;text-align:center;text-anchor:right"
    air_temperature_value.textContent = Math.round(data.field1*10)/10 + "°C";
    air_temperature_value.style="font-size:9px;text-align:center;text-anchor:left"

    row_1_temperature.textContent = Math.round(data.field3*10)/10 + "%";
    row_1_temperature.style="font-size:9px;text-align:center;text-anchor:right"
    row_3_temperature.textContent = Math.round(data.field4*10)/10 + "%";
    row_3_temperature.style="font-size:9px;text-align:center;text-anchor:left"
    row_5_temperature.textContent = Math.round(data.field5*10)/10 + "%";
    row_5_temperature.style="font-size:9px;text-align:center;text-anchor:right"
    row_7_temperature.textContent = Math.round(data.field6*10)/10 + "%";
    row_7_temperature.style="font-size:9px;text-align:center;text-anchor:left"
}

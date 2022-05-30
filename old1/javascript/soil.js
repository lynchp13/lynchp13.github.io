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


 async function getESPAirReadings()
 {
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

   console.log(sensor_readings)
   updateSVG(data)
   // document.getElementById("ESPdemo").innerHTML = sensor_readings
 }

 function updateSVG(data)
 {
   console.log(data);
    //when user clicks this button we turn on the light which has id="my_light"
    // turn_off("tree");
    var elem = document.getElementById("svg-object");
    var doc = elem.getSVGDocument();
    var air_pressure_label = doc.getElementById("air-pressure-label");
    var air_pressure_value = doc.getElementById("air-pressure-value");
    var air_temperature_value = doc.getElementById("air-temperature-value");
    var highest_temperature_value = doc.getElementById("highest-temperature-value");
    var lowest_temperature_value = doc.getElementById("lowest-temperature-value");
    var highest_moisture_value = doc.getElementById("highest-moisture-value");
    var lowest_moisture_value = doc.getElementById("lowest-moisture-value");
    var air_pressure_arrow = doc.getElementById("path3933-7");
    var lowest_temperature_arrow = doc.getElementById("path1533-4");
    var lowest_moisture_arrow = doc.getElementById("path1533");
    var highest_moisture_arrow = doc.getElementById("path1533-2");
    var highest_temperature_arrow = doc.getElementById("path1533-2-2");
    var highest_moisture_text = doc.getElementById("text1837-5");


    // air_pressure_label.setAttribute("fill", "green");
    // var tree = doc.querySelector("tree"); // suppose our image contains a <rect>
    // air_pressure_label.setAttribute("visibility","hidden");
    air_pressure_value.textContent = Math.round(data.field2*10)/10 + "hPa";
    air_pressure_value.style="font-size:9px;text-align:center;text-anchor:right"
    air_temperature_value.textContent = Math.round(data.field1*10)/10 + "°C";
    air_temperature_value.style="font-size:9px;text-align:center;text-anchor:left"
    highest_temperature_value.textContent = "TESTING";
    highest_temperature_value.style="font-size:9px;text-align:center;text-anchor:rileftght"
    lowest_temperature_value.textContent = "TESTING";
    lowest_temperature_value.style="font-size:9px;text-align:center;text-anchor:left"
    highest_moisture_value.textContent = "TESTING";
    highest_moisture_value.style="font-size:9px;text-align:center;text-anchor:right"
    lowest_moisture_value.textContent = "TESTING";
    lowest_moisture_value.style="font-size:9px;text-align:center;text-anchor:left"
    // lowest_moisture_value.x = "268.39194";
    lowest_moisture_value.setAttribute("x", "-248.39194");
    lowest_moisture_value.setAttribute("y", "121.879973");

    // air_pressure_arrow.setAttribute("d", "m -237.13283,-303.055 h -83.88509 l -38.35789,22.14592")
    // lowest_temperature_arrow.setAttribute("d", "m 170, 117.76295 23.63006, 23.63007 h 1000")
    // lowest_moisture_arrow.setAttribute("d", "m 170, 313.25044 23.63006,23.63006 h 1000")
    // lowest_temperature_arrow.setAttribute("d", "m 235, 117.76295 23.63006, 23.63007 h 1000")
    // lowest_moisture_arrow.setAttribute("d", "m 235, 313.25044 23.63006,23.63006 h 1000")
    // lowest_temperature_arrow.setAttribute("d", "m 295, 117.76295 23.63006, 23.63007 h 1000")
    // lowest_moisture_arrow.setAttribute("d", "m 295, 313.25044 23.63006,23.63006 h 1000")
    // highest_temperature_arrow.setAttribute("d", "M 168.67898,164.82308 145.04892,141.19302 H 23.883822")
    // highest_moisture_arrow.setAttribute("d", "M 168.81962,410.39486 145.18956,386.7648 H 17.096152")
    // highest_temperature_arrow.setAttribute("d", "M 218.67898,264.82308 195.04892,241.19302 H 23.883822")
    // highest_moisture_arrow.setAttribute("d", "M 218.81962,410.39486 195.18956,386.7648 H 17.096152")
    // highest_temperature_arrow.setAttribute("d", "M 268.67898,164.82308 245.04892,145 H 23.883822")
    // highest_moisture_arrow.setAttribute("d", "M 268.81962,410.39486 245.18956,390 H 17.096152")

    highest_moisture_text.setAttribute("x", "7.2285");
    highest_moisture_text.setAttribute("y", "100");
}
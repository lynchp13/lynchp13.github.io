// Your Scripts

function changeColor(color)
{
    // What to do
    const env_prop = document.querySelector(".env_prop");
    env_prop.style.color = color;
}

async function getSensorReadings()
{
  const api_url = "https://api.smartcitizen.me/v0/devices/15347";
  // Making a GET request using an axios instance from a connected library
  // axios.get(`${api_url}`).then(response => {console.log(response.data.name);}).catch(error => console.error('Error', error))

  let res = await axios.get(`${api_url}`);

  let data = res.data;
  console.log(data.name);

  sensor_readings = ""

  for (let i = 0; i <= 10; i++)
  {
    sensor_readings += data.data.sensors[i].name + ",\t\t\t" + data.data.sensors[i].value +  data.data.sensors[i].unit + "<br>";
  }

  document.getElementById("demo").innerHTML = sensor_readings
}

function changeTrafficColor(color)
{
    // What to do

    const traffic_prop = document.querySelector(".traffic_prop");
    traffic_prop.style.color = color;
}
function appendData(data)
{
  console.log(data)
  // var mainContainer = document.getElementById("myTrafficData");
  // var div = document.createElement("div");
  // div.innerHTML = 'Last Data Package: ' + data.features[0].properties.last_data_package;
  // mainContainer.appendChild(div);
  var traffic_data = "Last Data Package: \t" + data.features[0].properties.last_data_package + "<br>"
                        + "Cars: \t" +  Math.round(data.features[0].properties.car)	+ "<br>"
                        + "Bikes: \t" +  Math.round(data.features[0].properties.bike)	+ "<br>"
                        + "Pedestrians: \t" + Math.round(data.features[0].properties.pedestrian)
  document.getElementById("traffic_demo").innerHTML = traffic_data;
}

async function getTrafficSensorReadings()
{
    fetch('traffic_data.json')
    .then(( {features} ) =>
    {
        console.log(features);
        sensor_readings = ""
        // features.forEach((d) =>
        // {
        //   // console.log(d)
        //   if(d.properties.segment_id === "9000003637")
        //   {
        //     sensor_readings += "Last Update, \t\t\t" + d.properties.last_data_package + "<br>";
        //     sensor_readings += "Cars,\t\t\t" + d.properties.car + "<br>";
        //     sensor_readings += "Bikes,\t\t\t" + d.properties.bike + "<br>";
        //     sensor_readings += "Pedestrians,\t\t\t" + d.properties.pedestrian;
        //   }
        // });
        document.getElementById("ESPdemo").innerHTML = sensor_readings
      })
      .catch(function (err) {
        console.log(err);
      });
// 	// var axios = require('axios');
//
// 	const traffic_api_url = "https://telraam-api.net/v1/reports/traffic_snapshot/";
// 	var data = '{\r\n    "time":"live",\r\n    "contents":"minimal",\r\n    "area":"53.344904,-6.280374,1.0"\r\n}\r\n';
// 	var config = {
// 		method: 'post',
// 		url: 'https://telraam-api.net/v1/reports/traffic_snapshot',
// 		headers: {
// 			'X-Api-Key': 'a462ZiQxok3iTvVSEjd5R7I0jWxNag3z63xvVqzP'
// 		},
// 		data : data
// 	};
// 	axios(config)
// 	.then(function (response) {
// 	  console.log(JSON.stringify(response.data));
// 	})
// 	.catch(function (error) {
// 	  console.log(error);
// 	});

  //
  // sensor_readings = ""
  //
  // for (let i = 0; i <= 10; i++)
  // {
  //   sensor_readings += data.data.sensors[i].name + ",\t\t\t" + data.data.sensors[i].value +  data.data.sensors[i].unit + "<br>";
  // }
  //
  // document.getElementById("demo").innerHTML = sensor_readings
}

async function d3()
{
  // d3.selectAll("article").style("color", "blue");

  const width = 960, height = 500;

  const x_scale = d3.scaleBand().range([0, width]).padding(0.1);
  const y_scale = d3.scaleLinear().range([height, 0]);

  const svg = d3.select("#d3_demo")
      .attr("width", width)
      .attr("height", height);

  // d3.json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria-states.json").then((data) => {  console.log(data); })
  // d3.json("test.json").then((data) => {  console.log(data); })

  // const el = d3.select("article");
  //
  //   d3.json("traffic_data.json").then(({features}) => {
  //     // console.log(data)
  //         el
  //           .selectAll("p")
  //           .data(features)
  //           .join("p")
  //           .text((d) => d.properties.car)
  //     });

  // d3.json("https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria-states.json").then(({ data }) => {
  //     data.forEach((d) => (d.Population = +d.info.Population))
  // })

  d3.json("traffic_data.json")
      .then(( {features} ) => {

  	 features.forEach((d) => (d.properties.car = +d.properties.car));
     features.forEach((d) => (d.properties.bike = +d.properties.car));
     features.forEach((d) => (d.properties.pedestrian = +d.properties.pedestrian));
     let count_arr = []
     let vehicle_arr = ["car", "bike", "pedestrian"];
     features.forEach((d) => (count_arr.push(d.properties.car, d.properties.bike, d.properties.pedestrian)));
     console.log(count_arr)

  	 // Scale the Domain
  	 x_scale.domain(count_arr.map((d) => d));
  	 y_scale.domain([0, d3.max(count_arr, (d) => d)]);

     console.log("height: " + height)
     console.log("x_scale: " + x_scale)
     console.log("y_scale: " + y_scale)

  	 // add the rectangles for the bar chart
  	 svg
  	  .selectAll("rect")
  	  .data(features)
  	  .join("rect")
  	  .attr("class", "bar")
  	  .attr("x", (d) => x_scale(d))
  	  .attr("y", (d) => y_scale(d))
  	  .attr("width", x_scale.bandwidth())
  	  .attr("height", (d) => height - y_scale(d));
  	});

}

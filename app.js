const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');


app.use( bodyParser.urlencoded( {extended:true} ) );

app.set('view engine', 'ejs');

app.listen(3000);


// css for response container
const cardCSS = "background-color: aliceblue; margin: 20px auto; width: 300px; font-family: sans-serif; font-size: 30px; border: gray 1px solid; padding: 20px; border-radius: 5px; text-align: center;"


// routing images
// Define the static file path. app.use() method mounts the middleware express.static
app.use(express.static('assets'));


app.get('/', (req, res)=> {
	
	console.log("server online..");

	res.sendFile( __dirname + '/index.html')
});


// general purpose function to check weather based on city input as argument
function checkWeather(ar, req, res) {
	
	const City = ar;
	const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ City + "&units=metric&APPID=a0562d44b2bd5392dc0f1ef5d322cc65";
	
	// send get request and receive json from api server and check the status code
	https.get( apiUrl, (response) => {
	console.log( response.statusCode )
	
		if(response.statusCode == 200){
			//parse it into JSON, reformat to 1 decimal point
			response.on("data", (data) => {
					const weatherData = JSON.parse(data);
					let desc = weatherData.weather[0].description;
					let icon = weatherData.weather[0].icon;
					let iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
					let cityTempVal = weatherData.main.temp;
					let cityTemp = Math.round(cityTempVal * 10) / 10 
					res.render('weather.ejs', {
						City : City.toUpperCase(),
						Temp : cityTemp,
						Desc : desc,
						Icon : iconURL
					});
					//res.send()
			});
		}
		else {
			res.sendFile( __dirname + '/404.html')
		}
		
	})
}


// weather response if option Accra is clicked
app.get('/Accra', (req, res) => {
	
	checkWeather('Accra', req ,res)
	
});


// weather response if option Berlin is clicked
app.get('/Berlin', (req, res) => {
	
	checkWeather('Berlin', req, res)
	
});


// weather response if option Cairo is clicked
app.get('/Cairo', (req, res) => {
	
	checkWeather('Cairo', req, res)
	
});


// a function to respond to custom searches submitted via the search form in the index.html
app.post('/', (req, res) => {

	const cityInput = req.body.cityName;
	
	checkWeather(cityInput, req, res)
	
});


// add 404 page... shortcut, send an image instead
app.use( (req, res)=> {
	res.status(404);
	res.sendFile( __dirname + '/assets/images/404.jpg')
});
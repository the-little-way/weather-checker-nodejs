const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');


app.use( bodyParser.urlencoded( {extended:true}) );


app.listen(3000);


// css for response container
const cardCSS = "background-color: aliceblue; margin: 20px auto; width: 300px; font-family: sans-serif; font-size: 30px; border: gray 1px solid; padding: 20px; border-radius: 5px; text-align: center;"


// routing images
// Define the static file path. app.use() method mounts the middleware express.static
app.use(express.static(__dirname+'/'));


app.get('/', (req, res)=> {
	
	console.log("server online..");

	res.sendFile( __dirname + '\\index.html') //using backslash in path due to windows file directory syntax
});


// weather response if option Accra is clicked
app.get('/accra', (req, res) => {
	
	const City = "Accra";
	
	const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Accra,gh&units=metric&APPID=a0562d44b2bd5392dc0f1ef5d322cc65";

	var cityTemp = "testing..";
	
	// send get request and receive json from api server and check the status code
	https.get( apiUrl, (response) => {
	console.log( response.statusCode )

		//parse it into JSON
		response.on("data", (data) => {
			const weatherData = JSON.parse(data);
			cityTemp = weatherData.main.temp;
		//	console.log( weatherData );
		//	console.log( cityTemp );
		//	return cityTemp;
			res.send(`
			<div style="${cardCSS}">
			The temperature in ${City} is:
			<br/>${cityTemp}
			<br/>degrees  Celcius
			<p><a href="/">Click here to go back</a></p>
			</div>
			`)
		});
	})
	
});


// weather response if option Berlin is clicked
app.get('/berlin', (req, res) => {
	
	const City = "Berlin";
	
	const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Berlin,de&units=metric&APPID=a0562d44b2bd5392dc0f1ef5d322cc65";

	var cityTemp = "";
	
	// send get request and receive json from api server and check the status code
	https.get( apiUrl, (response) => {
	console.log( response.statusCode )

		
		response.on("data", (data) => {
			const weatherData = JSON.parse(data);
			cityTemp = weatherData.main.temp;
			res.send(`
			<div style="${cardCSS}">
			The temperature in ${City} is:
			<br/>${cityTemp}
			<br/>degrees  Celcius
			<p><a href="/">Click here to go back</a></p>
			</div>
			`)
		});
	})
	
});


// weather response if option Cairo is clicked
app.get('/cairo', (req, res) => {
	
	const City = "Cairo";
	
	const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Cairo,eg&units=metric&APPID=a0562d44b2bd5392dc0f1ef5d322cc65";

	var cityTemp = "";
	
	// send get request and receive json from api server and check the status code
	https.get( apiUrl, (response) => {
	console.log( response.statusCode )


		response.on("data", (data) => {
			const weatherData = JSON.parse(data);
			cityTemp = weatherData.main.temp;
			res.send(`
			<div style="${cardCSS}">
			The temperature in ${City} is:
			<br/>${cityTemp}
			<br/>degrees  Celcius
			<p><a href="/">Click here to go back</a></p>
			</div>
			`)
		});
	})
	
});


// a function to respond to custom searches submited via the search form in the index.html
app.post('/', (req, res) => {

	//console.log(req.body.cityName);
	const City = req.body.cityName
	
	const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + City + "&units=metric&APPID=a0562d44b2bd5392dc0f1ef5d322cc65";

	var cityTemp = "";
	
	// send get request and receive json from api server and check the status code
	https.get( apiUrl, (response) => {
	console.log( response.statusCode )
		
		//only display city if a valid resposne from api server
		if (response.statusCode == 200){
			
			response.on("data", (data) => {
				const weatherData = JSON.parse(data);
				cityTemp = weatherData.main.temp;
				res.send(`
				<div style="${cardCSS}">
				The temperature in ${City} is:
				<br/>${cityTemp}
				<br/>degrees  Celcius
				<p><small><a href="/">Click here to go back</a></small></p>
				</div>
				`)
			});
		}
		else {
			res.send(`
			<div style="${cardCSS}">
			Sorry, no match found for ${City} at this moment...
			</div>
			`);
		}
	})
	
});


// add 404 page... shortcut, send an image instead
app.use( (req, res)=> {
	res.status(404);
	res.sendFile( __dirname + '\\images\\404.jpg') //using backslash in path due to windows file directory syntax
});

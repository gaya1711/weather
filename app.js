const express = require('express');
const https = require("https");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('papa'));

app.get("https://gaya1711.github.io/weather/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

app.post("https://gaya1711.github.io/weather/", function(req, res){
    console.log(req.body.city);
    const query=req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=fbc1c0c09913d943a2a7a2acfcbca211&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on('data',function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
            const weatherCondition = weatherData.weather[0].description
            res.write("<p>weather condition is "+weatherCondition+".</p>")
            res.write('<h1>temp in '+ req.body.city +' is '+temp+" degree celcius.</h1>")
            res.write("<img src="+ imageURL+">")
            res.send();
        })
    })
})


app.listen(3000,function(){
    console.log('server is running at port 3000');
})
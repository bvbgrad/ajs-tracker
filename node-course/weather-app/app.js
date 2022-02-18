require('dotenv').config();
const request = require('postman-request');

const TOKEN = process.env.TOKEN
const url = 'http://api.weatherstack.com/current?access_key=' + TOKEN + '&query=37.8267,-122.4233&units=f'

request({url: url, json: true}, (error, response) => {
    console.log(response.body.current)
    console.log("It is currently " + response.body.current.temperature + " degrees out.  It feels like " + response.body.current.feelslike + " degrees.")
    console.log(response.body.current.weather_descriptions[0] + ". There is a " + response.body.current.precip + "% chance of rain.")
})

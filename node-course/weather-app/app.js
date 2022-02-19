require('dotenv').config();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]
if (!location) {
    return console.log("No location provided")
}

geocode(location, (error, {latitude, longitude, location} = {}) => {
    if (error) {
        return console.log('Error:', error)
    } else {
        // console.log('Geocode Data:', geocodeData)
        forecast(latitude, longitude, (error, {temperature, feelslike, precip, summary}) => {
            if (error) {
                return console.log('Error:', error)
            }
            // console.log('Forecast Data:', forecastData)
            console.log("The weather is '" + summary + "' all day for '" + location + "'.")
            console.log("It is currently " + temperature + " degrees out.  It feels like " + feelslike + " degrees.")
            console.log("There is a " + precip + "% chance of rain.")
        })
    }
    
})


// const url = 'http://api.weatherstack.com/current?access_key=' + process.env.TOKEN + '&' + latitude + ',' + longitude + '&units=f'
// request({url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to to get weather data')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.current)
//         console.log("It is currently " + response.body.current.temperature + " degrees out.  It feels like " + response.body.current.feelslike + " degrees.")
//         console.log(response.body.current.weather_descriptions[0] + ". There is a " + response.body.current.precip + "% chance of rain.")
//     }
// })


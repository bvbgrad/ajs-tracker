require('dotenv').config();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const location = process.argv[2]
if (!location) {
    return console.log("No location provided")
}

geocode(location, (error, geocodeData) => {
    if (error) {
        return console.log('Error:', error)
    }
    // console.log('Geocode Data:', geocodeData)
    
    forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
        if (error) {
            return console.log('Error:', error)
        }
        // console.log('Forecast Data:', forecastData)
        console.log('Weather report for: ', geocodeData.location)
        console.log("It is currently " + forecastData.temperature + " degrees out.  It feels like " + forecastData.feelslike + " degrees.")
        console.log("It is '" + forecastData.summary + "' throughout the day with a " + forecastData.precip + "% chance of rain.")
    })
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


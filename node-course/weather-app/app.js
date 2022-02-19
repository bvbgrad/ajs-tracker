require('dotenv').config();
const geocode = require('./utils/geocode')


geocode('Boston', (error, data) => {
    console.log('Error:', error)
    console.log('Data:', data)
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


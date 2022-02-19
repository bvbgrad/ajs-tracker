const request = require('postman-request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='  + process.env.TOKEN + '&query=' + lat + ',' + long + '&units=f'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to to get weather data', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                precip: response.body.current.precip
            })
        }
    })
}

module.exports = forecast

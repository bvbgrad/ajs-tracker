const request = require('postman-request');

const geocode = (address, callback) => {
    // const geocode_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=" + process.env.MAP_TOKEN
    const geocode_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + encodeURIComponent(address) + '.json?access_token=' + process.env.MAP_TOKEN + '&limit=1'
    
    request({url: geocode_url, json: true}, (error, response) => {
        const features = response.body.features
        if (error) {
            callback('Unable to get location information', undefined)
        } else if (features.length === 0) {
            callback('Invalid search parameter. Please try again', undefined)
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode
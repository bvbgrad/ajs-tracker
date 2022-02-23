const path = require('path');
const express = require('express');
const hbs = require('hbs');

require('dotenv').config();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve static content
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brent Bingham'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Brent Bingham'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help message',
        title: 'Help',
        name: 'Brent Bingham'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            } else {
                // console.log('Geocode Data:', geocodeData)
                forecast(latitude, longitude, (error, {temperature, feelslike, precip, summary} = {}) => {
                    if (error) {
                        return res.send({
                            error: error
                        })
                    }
                    // console.log('Forecast Data:', forecastData)
                    res.send({
                        forecastSummary: "The weather is '" + summary + "' all day for '" + location + "'.",
                        forecast: "It is currently " + temperature + " degrees out.  It feels like " + feelslike + " degrees.",
                        forecastPrecip: "There is a " + precip + "% chance of rain.",
                        location: location,
                        address: req.query.address
                    })
                })
            }
            
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: '404',
        name: 'Brent Bingham'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Brent Bingham'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

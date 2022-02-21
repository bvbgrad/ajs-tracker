const path = require('path');
const express = require('express');
const hbs = require('hbs');

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
    res.send({
        forecast: 'It is snowing',
        location: 'Philedelphia'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: '404',
        name: 'Brent Bingham'
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

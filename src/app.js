const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

// define paths for express config
app.use(express.static(path.join(__dirname,'../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rayyan Albaz'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About!',
        name: 'Rayyan Albaz'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'HELP!',
        name: 'Rayyan Albaz',
        message:'HELP MSGGG!!!!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide an address!'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error) {
                return res.send({error})
            } else {
                forecast(latitude, longitude, (error, forecasDdata) => {
                    if(error){
                        return res.send(error)
                    } else {
                        return res.send({location, forecast: forecasDdata, address: req.query.address})
                    }
                  })
            }
        })
    }
    
}) 

app.get('/products', (req, res) => {
    console.log(req.query.key)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Rayyan Albaz',
        message:'Article not found!'
    })})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Rayyan Albaz',
        message:'Page not found!'
    })})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
    
})

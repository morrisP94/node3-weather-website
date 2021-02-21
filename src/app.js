const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('views', viewPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title:'Weather',
        name:'Moris Peric'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About me',
        name: 'Moris Peric'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title:'Help',
        name: 'Moris Peric'
    })
})
app.get('/wheater', (req, res)=> {

    if(!req.query.address) {
        return res.send({
            error:"You have to provide an address !"
        })
    }

    geocode (req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) 
            return res.send({ error })
        forecast(longitude, latitude,  (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location:location,
                address: req.query.address
            })
                
        })
        
        
    })

})

app.get("/products", (req, res)=> {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get("/help/*", (req, res)=> {
    res.render("404", {
        title: "404",
        name: "Moris Peric",
        errorMessage: "Help article not found !"
    })
})
app.get('*', (req, res)=> {
    res.render("404", {
        title: "404",
        name: "Moris Peric",
        errorMessage: "My 404 page"
    })
})



app.listen(3000, ()=> {
    console.log('Server is up on port 3000!')
})
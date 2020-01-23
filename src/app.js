const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Vikash Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Vikash Kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Vikash Kumar',
        msg:'This page will help you out!'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address for weather'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if(error){
            return res.send({
                error:error
            })
        }


        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast:forecastData.summary,
                temperature:forecastData.temperature,
                rain:forecastData.rain,
                address:req.query.address
            })
            console.log(location)
            console.log(forecastData)
        })


    })
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vikash Kumar',
        msg:'Help Article not found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Vikash Kumar',
        msg:'Not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on '+port)
})
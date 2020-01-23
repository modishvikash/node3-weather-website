const request = require('request');

const forecast = (lat,long, callback)=>{
    const url = 'https://api.darksky.net/forecast/f8656f1065a4c36a875bca1cc37d144e/'+lat+','+long;
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Weather services')
        }else if(body.error){
            callback('Unable to find location. Try another search')
        }else{
            callback(undefined,{
                summary:body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +' degrees out. A high of '+body.daily.data[0].temperatureHigh+' degrees and a low of '+body.daily.data[0].temperatureLow+' degrees can be expected today. There is a '+body.currently.precipProbability+'% chance of Rain',
                temperature:body.currently.temperature,
                rain:body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast



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
                summary:body.daily.data[0].summary,
                temperature:body.currently.temperature,
                rain:body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast



const res = require('express/lib/response')
const request = require('request')

const forecast = (lang, lat, callback) => {
    const url = "https://api.darksky.net/forecast/5ea5011652a9c66197e6d7725e7e406d/"+lang+"," +lat+"?units=si" 
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to weather app!",undefined)
      } else if (body.error) {
        callback("Unable to to find location!",undefined)
      } else {
        callback(undefined,
            "Currently: "+
            body.currently.temperature +
            " degrees out. There is a " +
            body.currently.precipProbability +
            "% chance of rain" +
            body.daily.data[0].summary+".\n"+
            ".\n Hourly: "+
            body.hourly.summary+".\n"+
            ".\n ALERTS: "+
            body.alerts[0].title      
        ) 
      }
    }) 
}   

module.exports = forecast
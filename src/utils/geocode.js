const request = require('request')

const geoCode = (location, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(location) +
      ".json?limit=1&access_token=pk.eyJ1IjoicmF5eWFuYWxiYXoiLCJhIjoiY2s4Nms1eHhpMGlzeTNucGdsc2x1NTE1dSJ9.Q1VmBG7g2AWPm9Oq0AOxJA" 
  
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("Unable to connect to location services!", undefined) 
      } else if (body.features.length === 0) {
        callback("Unable to to find location, Try another search!", undefined) 
      } else {
        callback(undefined, {
          location: body.features[0].place_name,
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1]
        }) 
      }
    }) 
  } 

  module.exports = geoCode
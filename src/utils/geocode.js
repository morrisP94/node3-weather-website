const request = require('request')
 
const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibW9yaW5qbyIsImEiOiJja2t6azAzejMwbGE1Mm5tc2JrNzlkbDJyIn0.yA-ikdG6vebAw6nUOnWQXg&limit=1'

     request({url, json: true}, (error, {body})=> {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try another search !', undefined)
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],

            })

        }
     })
}

module.exports = geocode
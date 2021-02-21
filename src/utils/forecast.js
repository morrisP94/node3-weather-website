const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c18d9559515e92bd3a42c56630e66dcf&query='+longitude+','+latitude
    request({url, json:true},(error, {body}) => {
    if(error) {
        callback("Unable to connect to weather service !", undefined)
    } else if (body.error) {
        callback('Unable to find location.', undefined)
    
    } else {
        const weatherDATA = body.current
        callback(undefined,'It is currently ' + weatherDATA.temperature + ' fahrenheit out. There is ' + weatherDATA.precip + '% to rain. It is ' + weatherDATA.weather_descriptions[0] + '.')
    }
})
}

module.exports = forecast

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c18d9559515e92bd3a42c56630e66dcf&query='+latitude+','+longitude
    request({url, json:true},(error, {body}) => {
    if(error) {
        callback("Unable to connect to weather service !", undefined)
    } else if (body.error) {
        callback('Unable to find location.', undefined)
    
    } else {
        const weatherDATA = body.current
        callback(undefined,'It is currently ' + weatherDATA.temperature +  ' Celsius out.' + "\n" +'There is ' + weatherDATA.precip + '% to rain. ' + '\n' + 'It is ' + weatherDATA.weather_descriptions[0] + ".\n" +
        ' Wind speed: ' + weatherDATA.wind_speed + "." + ' Humidity: ' + weatherDATA.humidity + "% .")
    }
})
}

module.exports = forecast

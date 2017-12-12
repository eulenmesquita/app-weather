const request = require('request');
var getWeather = (latitude, longitude, callback) => {
    var k = '234320bd7e6b1e301ad287b87dd03767';
    request({
        url: `https://api.darksky.net/forecast/${k}/${latitude},${longitude}?units=si`,
        json:true
    },
    (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather.', undefined);
        } 
    }
);

}
 module.exports.getWeather = getWeather;
//234320bd7e6b1e301ad287b87dd03767
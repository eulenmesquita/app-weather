
const request = require('request'); 

var geocoder = (address, callback) => {

    var encodedAddress = encodeURIComponent(address);

    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
        }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers');
        } else if (body.status === 'ZERO_RESULTS'){
            callback('Unable to find location of that address');
        } else if (body.status === 'INVALID_REQUEST') {
            callback('Please provide a more detailed address');
        } else if (body.status === 'OK'){
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat, 
                longitude: body.results[0].geometry.location.lng
            });
        } else {
            callback('Something went wrong');
        }
        
    });
}

module.exports.geocodeAddress = geocoder;
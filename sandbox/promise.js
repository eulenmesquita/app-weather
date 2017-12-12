const request = require('request'); 

var geocodeAddress = (address) => {
    var encodedAddress = encodeURIComponent(address);
    
    return new Promise((resolve, reject) => {
        request({
            url:` https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                reject('Unable to connect to Google servers');
            } else if (body.status === 'ZERO_RESULTS'){
                reject('Unable to find location of that address');
            } else if (body.status === 'INVALID_REQUEST') {
                reject('Please provide a more detailed address');
            } else if (body.status === 'OK'){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat, 
                    longitude: body.results[0].geometry.location.lng
                });
            } 
        });
    });
}

geocodeAddress('000000000000')
    .then((location) => {
        console.log(JSON.stringify(location, undefined, 2));
    })
    .catch((errorMessage) => {
        console.log(errorMessage);    
    });

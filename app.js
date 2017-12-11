const request = require('request'); 
const yargs = require('yargs');

const argv = yargs
    .options({
        a: {
            demanded: true,
            alias: 'address',
            describe: 'Address to fetch the weather for',
            string: true
        } 
    })
    .help()
    .alias('help', 'h')
    .argv;

var address = encodeURIComponent(argv.address);

request({
    url:` https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to Google servers');
    } else if (body.status === 'ZERO_RESULTS'){
        console.log('Unable to find location of that address');
    } else if (body.status === 'INVALID_REQUEST') {
        console.log('Please provide a more detailed address');
    } else if (body.status === 'OK'){
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Lat: ${body.results[0].geometry.location.lat}, Long: ${body.results[0].geometry.location.lng}`);
    } else {
        console.log('Something went wrong');
    }
    
});
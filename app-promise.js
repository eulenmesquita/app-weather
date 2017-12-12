const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
    .then((response) => {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
        }
        var k = '234320bd7e6b1e301ad287b87dd03767';
        var latitude = response.data.results[0].geometry.location.lat; 
        var longitude = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/${k}/${latitude},${longitude}?units=si`;

        return axios.get(weatherUrl)
    })
    .then( (response) => {
        console.log(`The current temperature is ${response.data.currently.temperature}. It feels like ${response.data.currently.apparentTemperature}`)
    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to APi servers');
        } else {
            console.log(e.message);
        }
    });
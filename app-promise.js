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
        console.log(JSON.stringify(response.data, undefined, 2));
    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to APi servers');
        } else{
            console.log(e.message);
        }
    });
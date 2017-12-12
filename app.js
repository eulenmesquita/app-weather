
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
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

geocode.geocodeAddress(argv.address, (errorMessage, addressResults) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        weather.getWeather(addressResults.latitude, addressResults.longitude, (error, weatherResults) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`The current temperature is ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`)
            }
        });
        
    }

});


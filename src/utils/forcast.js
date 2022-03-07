const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c9a28a9dfe6d1974f6850e08967c6ff8&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. Feels like ${body.current.feelslike} degrees outside.`
      );
    }
    // {
    //     condition: response.body.current.weather_descriptions[0],
    //     currentTemp: response.body.current.temperature,
    //     feelsLike: response.body.current.feelslike,
    //     location: `${response.body.location.name} ${response.body.location.region}, ${response.body.location.country}`,
    //   }
  });
};

module.exports = forecast;

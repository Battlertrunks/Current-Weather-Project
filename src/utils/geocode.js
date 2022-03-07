const request = require("postman-request");

const geocode = (adress, callback) => {
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    encodeURIComponent(adress) +
    `.json?access_token=pk.eyJ1IjoiYmF0dGxlcnRydW5rcyIsImEiOiJjbDBibWp2b2owa3Y3M2ttaXFqcGhuc2czIn0.mMX8CSoiLlNX7k3NzANoGQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the location services.", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

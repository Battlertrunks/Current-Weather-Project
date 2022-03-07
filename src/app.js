const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forcast");

const app = express();

// Desfine paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Gavin Szczesniak",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Gavin Szczesniak",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page.",
    description:
      "This page here if for when you have problems or questions that we can address!",
    name: "Gavin Szczesniak",
  });
});

// Home page
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// // Help page
// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Gavin",
//     },
//     {
//       name: "Natalie",
//     },
//   ]);
// });

// About page
// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

// Weather page
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide a adress. Try another search." });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provided a search term.",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("page-not-found", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Gavin Szczesniak",
  });
});

app.get("*", (req, res) => {
  res.render("page-not-found", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Gavin Szczesniak",
  });
});

// Sets up the server
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

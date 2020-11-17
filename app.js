//jshint esversion:6

const express = require("express");
const fetch = require("node-fetch");
const bodyparser = require("body-parser");
const https = require("https");
const chart = require("chart.js");
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended: true
}));

const port = process.env.PORT || "1337";

app.set("port", port);
app.set('view engine', 'ejs');

var countryurl = "";
var Country_name, Total_cases, Critical_cases, Total_deaths, Active_cases, Recovered_cases, Tests_done, Img_link;
var tc, ac, rc, td, cc, dc;

app.get("/", function(req, res) {

  res.render("corono", {
    country_name: Country_name,
    img_link: Img_link,
    totalcases: Total_cases,
    activecases: Active_cases,
    recoveredcases: Recovered_cases,
    testsdone: Tests_done,
    criticalcases: Critical_cases,
    deathcases: Total_deaths
  });

});

app.post("/", function(req, res) {
  var country = req.body.country;
  var countryurl = "https://corona.lmao.ninja/v2/countries/" + country;
  fetch(countryurl)
    .then(res => res.json())
    .then(json => {
      Country_name = json.country;
      Total_cases = json.cases;
      Active_cases = json.active;
      Recovered_cases = json.recovered;
      Tests_done = json.tests;
      Critical_cases = json.critical;
      Total_deaths = json.deaths;
      Img_link = json.countryInfo.flag;
      res.redirect("/");
    });
});

let Total_casesin, Critical_casesin, Total_deathsin, Active_casesin, Recovered_casesin, Tests_donein, Imgin;


fetch("https://corona.lmao.ninja/v2/countries/India")
  .then(res => res.json())
  .then(json => {
    Total_casesin = json.cases;
    Active_casesin = json.active;
    Recovered_casesin = json.recovered;
    Tests_donein = json.tests;
    Critical_casesin = json.critical;
    Total_deathsin = json.deaths;
    Imgin = json.countryInfo.flag;

  });




app.get("/india", function(req, res) {

  res.render("india", {
    india_totalcases: Total_casesin,
    india_activecases: Active_casesin,
    india_recoveredcases: Recovered_casesin,
    india_testsdone: Tests_donein,
    india_criticalcases: Critical_casesin,
    india_totaldeaths: Total_deathsin,
    ind_link: Imgin
  });

});

var State_name, sTotal_deaths, sRecovered_cases, sTests_done, stotal_confirmed;
app.post("/india", function(req, res) {

});

app.get("/documentation", function(req, res) {
  res.render("documentation");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(port, () => console.log(`Server running on localhost:${port}`));

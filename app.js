//jshint esversion:6

const express = require("express");
const fetch = require("node-fetch");
const bodyparser = require("body-parser");
const https = require("https");
const chart = require("chart.js");
const alert = require("alert");
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
var wtc, wac, wrc, wtd, wcc, wd;

fetch("https://disease.sh/v3/covid-19/all")
  .then(res => res.json())
  .then(json => {
    wtc = json.cases;
    wac = json.active;
    wrc = json.recovered;
    wtd = json.tests;
    wcc = json.critical;
    wd = json.deaths;
  });

app.get("/", function(req, res) {

  res.render("corono", {
    error: Error,
    country_name: Country_name,
    img_link: Img_link,
    totalcases: Total_cases,
    activecases: Active_cases,
    recoveredcases: Recovered_cases,
    testsdone: Tests_done,
    criticalcases: Critical_cases,
    deathcases: Total_deaths,
    world_tc: wtc,
    world_ac: wac,
    world_rc: wrc,
    world_cc: wcc,
    world_td: wtd,
    world_d: wd
  });

});

app.post("/", function(req, res) {
  var country = req.body.country;
  var countryurl = "https://corona.lmao.ninja/v2/countries/" + country;
  var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
    "Ireland", "Isle ofMan", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine",
    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia",
    "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"
  ];
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
    })
    .catch(err => {
      alert("Please Enter the Country Name Correctly !!");
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

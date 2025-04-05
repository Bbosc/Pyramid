const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config({path: __dirname+"/./src/config/.env"});
const pyramidRoutes = require("./src/routes/pyramidRoutes");
const chronosRoutes = require("./src/routes/chronosRoutes");
const templateRoutes = require("./src/routes/templateRoutes");
const healthRoutes = require("./src/routes/healthRoutes");
// add new routes here

const app = express();
const port = 5353;

app.set("views", "./src/views")
app.set("view engine", "ejs");

const uriCollection = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.SERVER_IP}:${process.env.DB_PORT}/`
const uri = uriCollection + `${process.env.DB_NAME}?authSource=admin`;
const uriDaily = uriCollection + `${process.env.DB_DAILY_NAME}?authSource=admin`;
const uriHealth = uriCollection + `${process.env.DB_HEALTH}?authSource=admin`;
// add new db here and in the .env file

var pyramidConnection = mongoose.connect(uri);
var chronosConnection = mongoose.createConnection(uriDaily);
var healthConnection = mongoose.createConnection(uriHealth);

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (_req, res) {
  res.render('home');
});

app.use("/pyramid", pyramidRoutes);
app.use("/chronos", chronosRoutes);
app.use("/health", healthRoutes);
app.use("/template", templateRoutes);
// add new url

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


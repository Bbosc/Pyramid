const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config({path: __dirname+"/./src/config/.env"});
const pyramidRoutes = require("./src/routes/pyramidRoutes");
const chronosRoutes = require("./src/routes/chronosRoutes");


const app = express();
const port = 5353;

app.set("views", "./src/views")
app.set("view engine", "ejs");

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.SERVER_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
const uriDaily = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.SERVER_IP}:${process.env.DB_PORT}/${process.env.DB_DAILY_NAME}?authSource=admin`;

mongoose.connect(uri);
const connection = mongoose.createConnection(uriDaily);

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (_req, res) {
  res.render('home');
});

app.use("/pyramid", pyramidRoutes);
app.use("/chronos", chronosRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config({path: __dirname+"/./src/config/.env"});
const taskRoutes = require("./src/routes/taskRoutes");


const app = express();
const port = 5353;

app.set("views", "./src/views")
app.set("view engine", "ejs");

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.SERVER_IP}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

mongoose.connect(uri);

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


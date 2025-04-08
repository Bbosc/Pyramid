const express = require("express");
const bodyParser = require("body-parser");
const templateRoutes = require("./src/routes/templateRoutes");

const app = express();
const port = 5353;

app.set("views", "./src/views")
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


app.use("/", templateRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


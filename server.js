var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);

var PORT = 8000;

app.use(express.static(path.join(__dirname + "/app/public")));

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

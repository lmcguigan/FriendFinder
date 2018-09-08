var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);

app.use(express.static(path.join(__dirname + "/app/public")));

app.listen(process.env.PORT || 5000, function () {
    console.log("App listening on PORT " + PORT);
});

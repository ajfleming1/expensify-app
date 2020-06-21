var express = require("express");
var path = require("path");
var app = express();
var publicPath = path.join(__dirname, "..", "dist");
app.use(express.static(publicPath));
app.get("*", function (req, res) {
    res.sendFile(path.join(publicPath, "index.html"));
});
app.listen(3000, function () { return console.log("Server is up."); });

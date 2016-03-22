var express = require("express"),
    app = express();
app.use("/", express.static(__dirname + "/public"));
app.get("/", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
});
app.listen(8080);
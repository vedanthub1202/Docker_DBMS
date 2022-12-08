var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://Localhost:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on("error", () => console.log("Error in the Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phno;
  var password = req.body.password;

  var data = {
    name: name,
    email: email,
    phone: phone,
    password: password,
  };

  db.collection("user").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.redirect("signup_success.html");
});

app
  .get("/", (res, req) => {
    res.setEncoding({
      "Allow-access-Allow-Origin": `*`,
    });
    return res.redirect(index.html);
  })
  .listen(3000);

console.log("Listening on PORT 3000");

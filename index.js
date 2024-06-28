var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path"); // Import path module

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/Database');
var db = mongoose.connection;
db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Handle form submission
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var age = req.body.age;
    var email = req.body.email;
    var phno = req.body.phno;
    var gender = req.body.gender;
    var password = req.body.password;

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phno": phno,
        "gender": gender,
        "password": password
    };
    
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
        // Redirect to manuo-master/manup-master/index.html after successful insertion
        res.redirect('/manup-master/manup-master/index.html'); // Adjust the path as needed
    });
});

// Serve your index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3002, () => {
    console.log("Listening on port 3002");
});

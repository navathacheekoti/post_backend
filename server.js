const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb://<dbuser>:<dbpassword>.mlab.com:19641/post_app");

let postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    name: String,
    created: { type: Date, default: Date.now }
});
let Post = mongoose.model("Post", postSchema);

app.post("/new", (req, res) => {
    console.log(req.body);
    const { title, image, body, name } = req.body;
    Post.create({ title, image, body, name }, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            res.send(post);
        }
    });
});
app.get("/", (req, res) => {
    Post.find({}, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            res.send(post);
        }
    });
});
app.get("/new/:id", (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            console.log(err);
        } else {
            res.send(post);
        }
    });
});
app.listen(process.env.PORT||3000, () => console.log("working"));

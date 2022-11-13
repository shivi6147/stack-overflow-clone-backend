const express = require('express');
const cors = require("cors");
const path = require("path");
const app = express();
const db = require('./db')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const router = require("./routers");

// db connection

db.connect();




//middleware
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

//API

app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get("*", (req, res) => {
    try {
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
    } catch (e) {
        res.send("error occurred");
    }
});


app.use(cors());

app.listen(PORT, () => {
    console.log(`Stack Overflow Clone API is running on PORT No- ${PORT}`);
});

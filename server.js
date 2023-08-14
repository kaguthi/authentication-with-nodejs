const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const useRoute = require('./routes/userRoute');
const app = express();

dotenv.config();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected successfully");
    })
    .catch((err) => console.log(err.message));

app.use(cookieParser());

// all routes
app.use("/", useRoute);

// server
app.listen(process.env.PORT, ()=>{
    console.log("The server is running on Port http://localhost:5000")
});
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const cors = require("cors");

// IMPORT ROUTES
const User_Route = require("./routes/user_auth");
const authority = require("./routes/authority");

require('dotenv').config()
// console.log(require('dotenv').config())
// console.log(process.env.RAZORPAY_USERNAME)

// CONNECT DB
mongoose.connect(
    process.env.MONGODB_URL || "mongodb+srv://publishing123:publishing123@cluster0.yctuv.mongodb.net/test",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => console.log("connected to db")
)

// MIDDLEWARE
app.use(express.json())
app.use(cors());

// ROUTE MIDDLEWARE
app.use("/user", User_Route)
app.use("/", authority)


//PORT
const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`server on port ${port}`))
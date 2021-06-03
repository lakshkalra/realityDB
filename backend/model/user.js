const { json } = require("express");
const { any, object, array } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    otp: {
        data: Number,
        default: ''
    },
    type: {
        type: String,
        default: "User"
    },
    razor_contact: {
        type: JSON,
        default: ""
    },
    razor_fund: {
        type: JSON,
        default: ""
    },
    razorpay: {
        contact: {
            type: JSON,
            required: true
        },
        funds: []
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
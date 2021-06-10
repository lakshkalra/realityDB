const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    book_name: {
        type: String,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    sales: {
        type: Number,
        required: true
    },
    royality: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    withdrawal_amount: {
        type: Number,
        default: 0

    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Customer', customerSchema);
const { Router } = require("express");
const customer = require("../model/customer");
const { findOne, findById } = require("../model/customer");
const Customer = require("../model/customer")
const router = require("express").Router();
const verify = require("./user_verification")


//ADDING NEW CUSTOMER
router.post("/auth/add", verify, async (req, res) => {

    const { name, email, book_name, isbn, sales, royality, amount, withdrawal_amount } = req.body

    const isbn_exist = await Customer.findOne({ isbn })

    if (!isbn_exist) {

        const customer = new Customer({
            name,
            email,
            book_name,
            isbn,
            sales,
            royality,
            amount,
            withdrawal_amount
        })

        try {
            const saved_Customer = await customer.save();
            res.json({ customer })
        } catch (err) {
            res.status(400).send(err);
        }


        // }
    }
    else {
        res.send("isbn already exist")
    }

})

//GET ALL DETAILS
router.get("/auth/info", verify, async (req, res) => {
    try {
        Customer.find({}, (err, results) => {
            res.json(results)
        })
    } catch (err) {
        res.json(err)
    }

})

//EDIT INFORMATION
router.post("/auth/edit", verify, async (req, res) => {

    const isbn = req.body.isbn
    custome = await Customer.findOne({ isbn })

    if (!req.body.royality) royality = custome.royality
    else royality = req.body.royality
    if (!req.body.sales) sales = custome.sales
    else sales = req.body.sales
    if (!req.body.amount) amount = custome.amount
    else amount = req.body.amount

    console.log(royality, sales, amount)

    cus = await Customer.findOne({ isbn })

    await Customer.findByIdAndUpdate(cus._id, { sales, royality, amount })
    res.json(await Customer.findOne({ isbn }))


})
module.exports = router
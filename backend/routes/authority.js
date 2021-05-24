const { Router } = require("express");
const customer = require("../model/customer");
const { findOne, findById } = require("../model/customer");
const Customer = require("../model/customer")
const router = require("express").Router();

//ADDING NEW CUSTOMER
router.post("/auth/add", async (req, res) => {

    b = req.body

    const { name, book_name, isbn, sales, royality, amount, withdrawal_amount } = b

    const isbn_exist = await Customer.findOne({ isbn })

    // if (isbn_exist) {
    //     console.log(isbn, sales)
    //     await Customer.findOneAndUpdate(isbn, { sales: sales })
    //     return res.status(200).json({ msg: "updated successfully" })

    // }

    // else {
    if (!isbn_exist) {
        try {
            const customer = new Customer({
                name,
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
                //TODO: delete console logs
                console.log(err)
                res.status(400).send(err);
            }
        } catch (err) {
            res.json(err)
        }

        // }
    }
    else {
        res.send("isbn already exist")
    }

})

//GET ALL DETAILS
router.get("/auth/info", async (req, res) => {
    try {
        Customer.find({}, (err, results) => {
            res.json(results)
        })
    } catch (err) {
        res.json(err)
    }

})

//EDIT INFORMATION
router.post("/auth/edit", async (req, res) => {

    const isbn = req.body.isbn
    custome = await Customer.findOne({ isbn })

    if (!req.body.royality) royality = custome.royality
    else royality = req.body.royality
    if (!req.body.sales) sales = custome.sales
    else sales = req.body.sales
    if (!req.body.amount) amount = custome.amount
    else amount = req.body.amount

    console.log(royality, sales, amount)
    // const { isbn, sales, royality, amount } = req.body

    cus = await Customer.findOne({ isbn })

    await Customer.findByIdAndUpdate(cus._id, { sales, royality, amount })
    res.json(await Customer.findOne({ isbn }))


})
module.exports = router
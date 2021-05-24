const { Router } = require("express")
const Customer = require("../model/customer")
const router = require("express").Router();

//ADDING NEW CUSTOMER
router.post("/auth/add", async (req, res) => {

    b = req.body
    console.log(b.tableRows[0])


    const { name, book_name, isbn, sales, royality, amount, withdrawal_amount } = b.tableRows[0]

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



})
module.exports = router
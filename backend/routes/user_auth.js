const { Router, response, json } = require("express")
const User = require("../model/user")
const router = require("express").Router();
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const otpGen = require('otp-generator')
const nodemailer = require('nodemailer');
const _ = require("lodash")
const verify = require("./user_verification")
const jwt_decode = require("jwt-decode")
const Customer = require("../model/customer")
const request = require('request');



const {
    user_register_validation,
    user_login_validation
} = require("../validation/user_validation");
const customer = require("../model/customer");

//USER REGIATRATION
router.post("/register", async (req, res) => {
    // console.log(req.body);
    // const { name, email, contact, password } = req.body

    //VALIDATING INFORMATION BEFORE REGISTRING USER
    const { error } = user_register_validation(req.body);

    if (error) {
        console.log(error)
        return res.status(400).send(error);
    }

    //CHECKING IF EMAIL IS AUTHORISED TO MAKE AN ACCOUNT
    const email_authorised = await Customer.findOne({ email: req.body.email })

    if (!email_authorised) return res.status(400).send("This email is not authorised to create account!")

    //CHECKING IF EMIAL ALREADY EXIST
    const email_exist = await User.findOne({ email: req.body.email });

    if (email_exist) return res.status(400).send("Email already exist!");

    // CHECKING IF CONTACT ALREADY EXIST
    const contact_exist = await User.findOne({ contact: req.body.contact });

    if (contact_exist) return res.status(400).send("This number already exsit!, Try again with new number");

    //PASSWORD HASHING USING BCRYPT
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(req.body.password, salt);

    const url = process.env.RAZORPAY_CONTACTID_URL
    const razor_uname = process.env.RAZORPAY_USERNAME
    const razor_pass = process.env.RAZORPAY_PASSWORD
    var auth = 'Basic ' + Buffer.from(razor_uname + ':' + razor_pass).toString('base64');

    //CREATING CONTACT_ID FOR RAZORPAY WITHDRAWAL/PAYOUT
    const options = {
        'method': 'POST',
        'url': url,
        'headers': {
            'Authorization': auth,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": req.body.name, "email": req.body.email, "contact": req.body.contact, "type": "customer" })


    };
    request(options, async (error, response) => {
        if (error) throw new Error('env' + error);
        const obj = JSON.parse(response.body)

        //SAVING THE USER TO USER_DB
        const user = new User({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            password: hashed_pass,
            razorpay: {
                contact: obj
            }

        });

        try {
            const saved_User = await user.save();
            res.json({ user: user.email });
        } catch (err) {
            res.status(400).send(err);
        }
    });
})



// USER LOGIN

router.post("/login", async (req, res) => {

    // VALIDATE DETAILS
    const { error } = user_login_validation(req.body);

    if (error) {
        console.log(error)
        return res.status(400).json(error);
    }
    //CHECK IF USER EXIST 

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("User doesn't exist, please sign-up first!");

    //VALIDATE PASSWORD

    const valid_pass = await bcrypt.compare(req.body.password, user.password);

    if (!valid_pass) return res.status(400).send("Invalid password");

    // CREATE AND ASSIGN TOKEN

    const token = JWT.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
    res.header("Authorization", token).json({
        token, user: user.type
    })

})


router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    // console.log('forgot' + req.body)

    otp = otpGen.generate(6, { upperCase: false, specialChars: false, alphabets: false });

    User.findOne({ email }, (err, user) => {
        if (!user) return res.status(400).json({ msg: "Invalid email!!!" })

        return user.updateOne({ otp: otp }, (err, success) => {

            if (err) {
                return res.status(401).json({ msg: "reset link error!" })
            } else {

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'lakshlkalratemp@gmail.com',
                        pass: 'uc@ntcmee1'
                    }
                });

                var mailOptions = {
                    from: 'lakshlkalratemp@gmail.com',
                    to: 'lakshkalra64@gmail.com',
                    subject: 'password reset',
                    text: otp
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        return res.status(200).json(info.response + "email send")
                    }
                });
            }
        })
    })
})

router.post('/reset-password', async (req, res) => {
    const { otp, password, email } = req.body
    // console.log('change: ' + otp, password, email)

    userr = await User.findOne({ email })
    // console.log('normal' + userr.otp, otp)

    const salt = await bcrypt.genSalt(10);
    const new_hashed_pass = await bcrypt.hash(req.body.password, salt);

    if (otp == userr.otp) {

        await User.findByIdAndUpdate(userr._id, { otp: "", password: new_hashed_pass })
        return res.status(200).json({ msg: "password updated successfully" })

    } else return res.send("invalid otp")

})

router.get('/myprofile', verify, async (req, res) => {

    //DECODE TOKEN 
    const token = req.header("Authorization")
    var decoded = jwt_decode(token)
    // console.log(decoded)

    await User.findById(decoded._id, async (err, result) => {
        if (err) return res.status(400).json(err)


        //SEND CUSTOMER DETAIL/USER DETAILS
        await Customer.find({ email: result.email }, (err, success) => {
            if (err) return res.status(400).json(err)

            // if (!cus) return res.send("not doumnf")
            res.status(200).json({
                name: result.name,
                contact: result.contact,
                email: result.email,
                customer: success
            })
        })
    })

})

//UPDATING INFORTION FROM ROUTE OF MYPROFILE
router.post('/myprofile', verify, async (req, res) => {

    const { email, name, contact } = req.body;

    userr = await User.findOne({ email })

    await User.findByIdAndUpdate(userr._id, { name, contact })
    res.status(200).json({ msg: "information updated!" })

})

//CHANGING PASSWORD OF USER
router.post('/changepass', verify, async (req, res) => {

    const { previous_password, new_password } = req.body

    const token = req.header("Authorization")
    var decoded = jwt_decode(token)

    await User.findById(decoded._id, async (err, result) => {
        if (err) return res.status(400).json(err)


        const valid_pass = await bcrypt.compare(previous_password, result.password);

        if (!valid_pass) return res.status(400).send("Invalid password");


        //PASSWORD HASHING USING BCRYPT
        const salt = await bcrypt.genSalt(10);
        const hashed_pass = await bcrypt.hash(new_password, salt);

        await User.findByIdAndUpdate(decoded._id, { password: hashed_pass }, (err, success) => {
            if (err) return res.status(400).json(err)

            res.status(200).json({ msg: "successfully updated" })
        })

    })

})



router.get('/razorfundid', async (req, res) => {
    //TOKEN DECODING
    const token = req.header("Authorization")
    const decoded = jwt_decode(token)

    const user = await User.findById(decoded._id)
    const fund_id = user.razorpay.funds
    res.send(fund_id)
})


//CREATE RAZORPAY FUND_ID FOR BANK ACCOUNT AND UPI/VPA
router.post('/razorfundid', async (req, res) => {
    const { account_type, name, ifsc, account_number, upi } = req.body

    if (!account_type) return res.status(400).json({ msg: "Invalid information! can not proceed further" })

    if (account_type == "bank_account") {
        if (!account_number || !name || !ifsc) {
            return res.status(400).json({ msg: "Invalid information! can not proceed further" })
        }

        if (account_type == "vpa") {
            if (!upi) {
                return res.status(400).json({ msg: "Invalid information! can not proceed further" })
            }

        }
    }
    //TOKEN DECODING
    const token = req.header("Authorization")
    const decoded = jwt_decode(token)

    const user = await User.findById(decoded._id)
    // console.log(user)
    const url = process.env.RAZORPAY_FUNDID_URL
    const auth = 'Basic ' + Buffer.from(process.env.RAZORPAY_USERNAME + ':' + process.env.RAZORPAY_PASSWORD).toString('base64');
    var options = {}

    //CREATING FUND_ID OF CURRENT USER
    if (account_type == "bank_account") {
        options = {
            'method': 'POST',
            'url': url,
            'headers': {
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "contact_id": user.razorpay.contact.id, "account_type": account_type, "bank_account": { "name": name, "ifsc": ifsc, "account_number": account_number } })

        };
    }
    else if (account_type == "vpa") {
        options = {
            'method': 'POST',
            'url': url,
            'headers': {
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "account_type": "vpa", "contact_id": user.razorpay.contact.id, "vpa": { "address": "gaurav.kumar@exampleupi" } })

        };
    }
    request(options, async (error, response) => {
        if (error) return res.status(401).json(error);

        const obj = JSON.parse(response.body)

        const fund = await User.findOne({ name: user.name })

        fund.razorpay.funds.push(obj)

        const updated = await fund.save()
        res.status(200).json('Successfully added')
    });

})

module.exports = router;

























































// await User.findByIdAndUpdate(decoded._id, { fund__id: obj }, async (err, success) => {
//     if (!err) return res.status(200).json(success)
//     else return res.status(400).json(err)

// })

// const abc = await User.findById(decoded._id)

// // abc.razorpay.funds[0] = JSON.parse(obj)
// console.log("funds:" + JSON.parse(obj))
// abc.save()
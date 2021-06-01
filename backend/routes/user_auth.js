const { Router } = require("express")
const User = require("../model/user")
const router = require("express").Router();
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const otpGen = require('otp-generator')
const nodemailer = require('nodemailer');
const _ = require("lodash")
const verify = require("./user_verification")
const jwt_decode = require("jwt-decode")


const {
    user_register_validation,
    user_login_validation
} = require("../validation/user_validation");

//USER REGIATRATION
router.post("/register", async (req, res) => {
    console.log(req.body);

    //VALIDATING INFORMATION BEFORE REGISTRING USER
    const { error } = user_register_validation(req.body);

    if (error) {
        console.log(error)
        return res.status(400).send(error);
    }
    //CHECKING IF EMIAL ALREADY EXIST
    const email_exist = await User.findOne({ email: req.body.email });

    if (email_exist) return res.status(400).send("Email already exist!");

    // CHECKING IF CONTACT ALREADY EXIST
    const contact_exist = await User.findOne({ contact: req.body.contact });

    if (contact_exist) return res.status(400).send("This number already exsit!, Try again with new number");

    //PASSWORD HASHING USING BCRYPT
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(req.body.password, salt);

    //CREATING NEW USER
    const user = new User({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        password: hashed_pass
    });

    try {
        const saved_User = await user.save();
        res.json({ user: user.email });
    } catch (err) {
        res.status(400).send(err);
    }
})



// USER LOGIN

router.post("/login", async (req, res) => {

    // VALIDATE DETAILS
    const { error } = user_login_validation(req.body);

    if (error) {
        console.log(error)
        return res.status(400).send(error);
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
    res.header("auth-token", token).json({
        token, user: user.type
    })

})


router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

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
                        return res.status(200).json(info.response)
                    }
                });
            }
        })
    })
})

router.post('/reset-password', async (req, res) => {
    const { otp, newpass, email } = req.body

    userr = await User.findOne({ email })
    console.log(userr.otp, otp)

    const salt = await bcrypt.genSalt(10);
    const new_hashed_pass = await bcrypt.hash(req.body.newpass, salt);

    if (otp == userr.otp) {

        await User.findByIdAndUpdate(userr._id, { otp: "", password: new_hashed_pass })
        return res.status(200).json({ msg: "password updated successfully" })

    } else return res.send("invalid otp")

})

router.get('/myprofile', verify, async (req, res) => {

    //DECODE TOKEN 
    const token = req.header("auth-token")
    var decoded = jwt_decode(token)

    await User.findById(decoded._id, (err, result) => {
        if (err) return res.status(400).json(err)

        res.status(200).json({
            name: result.name,
            contact: result.contact,
            email: result.email
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

    const token = req.header("auth-token")
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

module.exports = router;
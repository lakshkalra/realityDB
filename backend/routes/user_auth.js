const { Router } = require("express")
const User = require("../model/user")
const router = require("express").Router();
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const otpGen = require('otp-generator')
const nodemailer = require('nodemailer');
const _ = require("lodash")

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
    console.log(req.body)

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
        process.env.TOKEN_SECRET);
    res.header("auth-token", token).json({
        token: token
    })

})


router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    otp = otpGen.generate(6, { upperCase: false, specialChars: false, alphabets: false });

    User.findOne({ email }, (err, user) => {
        if (!user) return res.status(400).json({ msg: "Invalid email!!!" })


        // const token = JWT.sign({ _id: user._id }, process.env.RESET_TOKEN, { expiresIn: '20m' })
        // const data = {
        //     from: 'lakshlkalratemp@gmail.com',
        //     to: email,
        //     subject: "Password reset link",
        //     html: `
        //     <h2> Click on Link to reset password
        //     otp: ${otp}
        //     <br>
        //     token: ${token}
        //     `
        // };

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
                        // console.log('Email sent: ' + info.response);
                    }
                });
            }
        })
    })
})

router.post('/reset-password', async (req, res) => {
    const { otp, newpass, email } = req.body

    // if (otp) {

    userr = await User.findOne({ email })
    console.log(userr.otp, otp)

    if (otp == userr.otp) {

        await User.findByIdAndUpdate(userr._id, { otp: "", password: newpass })
        return res.status(200).json({ msg: "password updated successfully" })

    } else return res.send("invalid otp")



    // await User.findOneAndUpdate(otp, { password: newpass, otp: otp })
    // return res.send("done")
    // } else return res.status(401).json({ msg: "Authentication error" })
})

module.exports = router;
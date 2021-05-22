const { Router } = require("express")
const User = require("../model/user")
const router = require("express").Router();
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")

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


module.exports = router;
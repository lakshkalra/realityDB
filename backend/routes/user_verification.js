const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).send("Access denied");

    try {
        const token_verified = JWT.verify(token, process.env.TOKEN_SECRET);

        req.user = token_verified;

        next();
    } catch (err) {
        res.status(400).send("Invalid token")
    }
}
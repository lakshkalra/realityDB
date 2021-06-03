var request = require('request');
require('dotenv').config()
console.log(require('dotenv').config())
console.log(process.env.TOKEN_SECRET)
// require('dotenv').config({ path: __dirname + '/.env' })
console.log(process.env.RAZORPAY_CONTACTID_AUTHORIZATION)
console.log(process.env.TOKEN_SECRET)
var options = {
    'method': 'POST',
    'url': 'https://api.razorpay.com/v1/contacts',
    'headers': {
        'Authorization': 'Basic cnpwX3Rlc3RfeWJNQzdHdEJRZUFNQ2w6Y1BsbEljTHlSbXhPREY4M29nVDhwa0hV',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "name": "Gaurav Kumar", "email": "gaurav.kumar@example.com", "contact": "9123456789", "type": "customer" })

};
request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    res.send(response.body)
});
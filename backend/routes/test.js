
const accountSid = 'AC6e474c6c8f1cb1db4d716da555ab2c74';
const authToken = 'd9760fe78ab5845e446b027413403b55';

const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Your mobile is getting hacked by twilo! New hacking gorup in market',
        from: '+13853360802',
        to: '+919958922130'
    })
    .then(message => console.log(message.sid));



const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const mailChimpApiKey = '771c78ace6d1d223df7ce0fe58dbaac6-us6';
const listId = '712e9e8222';
// 673270

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));

app.get("/", (req, res) => 
    res.sendFile(__dirname + "/signup.html")
);

app.post("/", (req, res) => {
    const body = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    console.log('firstName=', firstName, ', lastName=', lastName, ', email=', email);

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const options = {
        url: 'https://us6.api.mailchimp.com/3.0/lists/' + listId,
        method: 'POST',
        headers: {
            'Authorization': 'kgromov ' + mailChimpApiKey
        },
        body: JSON.stringify(data)
    };    

    request(options, function(error, response, body) {
        if (error || response.statusCode !== 200) {
            console.error(error);
            response.sendFile(__dirname + "/failure.html");
        } else {
            response.sendFile(__dirname + "/success.html")
        }
    });

});

app.get("/failure", (req, res) => 
    res.redirect("/")
);

app.listen(9000, () => {
    console.log("Server is started on post 9000");
});

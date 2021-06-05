// import express from "express";
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

/* For some reason jQuery is not visible */
// import $ from 'jquery';
// window.jQuery = window.$ = $;

// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;

// var $ = jQuery = require('jquery')(window);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    // $('.container').append('<p>JQuery, hello!</p>');
    // res.send('Hello fucking world!');
});

app.post("/bmicalculator", (req, res) => {
    const body = req.body;
    const name = body.name;
    const weight = Number(body.weight);
    const height = Number(body.height);
    const bmi = Math.round(weight / (height * height));
    res.send(`Your bmi is ${bmi}:<br>` + bodyIndexDescription(bmi));
});

app.listen(9000, () => {
    console.log("Server is started on post 9000");
});


// auxilary
function bodyIndexDescription(bmi) {
    if (bmi > 35) {
        return "You are fat as hell!";
    }  else if (bmi < 20) {
        return "You'd rather slim";
    } else if (bmi > 25) {
        return "You are a bit overweight";
    } else {
        return "Yoy are perfect!";
    }
}
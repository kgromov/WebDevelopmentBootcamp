//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const dateUtils = require(__dirname + "/date-utils.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("resources"));

const todoList = [];
const workItems = [];


app.get("/", function(req, res) {
  res.render("list", {title: dateUtils.getDate(), todoList: todoList});
});

app.get("/work", function(req, res) {
  res.render("list", {title: dateUtils.getDay(), todoList: workItems});
});

app.post("/", function(req, res) {
  const newItem = req.body.newItem;
  const listType = req.body.listType;
  console.log('listType=', listType);
  if (listType === 'Work') {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    todoList.push(newItem);
    res.redirect("/");
  }
});


app.listen(9000, function(){
  console.log("Server started on port 9000.");
});

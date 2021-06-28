//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const StringUtils = require("lodash");
// const dateUtils = require(__dirname + "/date-utils.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("resources"));

mongoose.connect('mongodb://localhost:27017/todoList', {useNewUrlParser: true, useUnifiedTopology: true});

const defaultItemsText = ['Welcome to your todoList!', 
                      'Hit + to add new item', 
                      'Hit checkbox to delete item'
                    ];

const itemSchema = new mongoose.Schema({ 
  name: 'string' 
});

const listSchema = new mongoose.Schema({ 
  name: 'string', 
  items: [itemSchema]
});

// Model - aka transient document object
const Item = mongoose.model('Item', itemSchema);
const List = mongoose.model('List', listSchema);


const defaultItems = defaultItemsText.map(itemText => new Item({name: itemText}));

// Item.insertMany(defaultItems, err => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Successfully insert items: ', defaultItems);
//   }
// });

app.get("/:listName", (req, res) => {
  const listName = StringUtils.capitalize(req.params.listName);
  
  List.findOne({name: listName}, (err, list) => {
    // TODO: handle error
    if (!list) {
      const newList = new List({name: listName, items: defaultItems});
      newList.save();
      res.redirect(`/${listName}`);
    } else {
      res.render("listItems", {listName: listName, items: list.items});
    }
  });  
});


app.post("/:listName", (req, res) => {
  const listName = req.body.listName;
  const itemName = req.body.itemName; 
  console.log('POST: listName=', listName);

   List.findOne({name: listName}, (err, list) => {
    if (!err) {
      const newItem = new Item({name: itemName});
      list.items.push(newItem);
      list.save();
      res.redirect(`/${listName}`);
    } else {
      console.error(err);
    }
  });
});

// TODO: try another REST-based approach
app.post("/delete/:listName/:itemId", (req, res) => {
  const listName = StringUtils.capitalize(req.params.listName);
  const itemId = StringUtils.capitalize(req.params.itemId);
  console.log(`DELETE: item by id=${itemId} from ${listName} list`);

   List.findOneAndUpdate({name: listName}, 
    {$pull: {items: {_id: itemId}}}, 
    (err, list) => {
    if (!err) {
      console.log(`Removed item by id=${itemId} from ${listName} list`);
      res.redirect(`/${listName}`);
    }        
  }); 
});


app.get("/", function(req, res) {
  List.find({}, {name: 1}, (err, lists) => {
    if (!err) {
      res.render("lists", {lists: lists});
    }    
  })  
});

app.post("/", function(req, res) {
  const listName = req.body.listName;
  res.redirect(`/${listName}`);
});

app.post("/delete/:listId", (req, res) => {
  const listId = StringUtils.capitalize(req.params.listId);
  console.log(`DELETE: list by id=${listId}`);

   List.findByIdAndDelete(listId, (err) => {
    if (!err) {
      console.log(`Removed list by id=${listId}`);
      res.redirect("/");
    }        
  });   
});

app.listen(9000, function(){
  console.log("Server started on port 9000.");
});

//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const StringUtils = require("lodash");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("resources"));

// ---------- Define schema -------------------
const defaultItemsText = ['Welcome to your todoList!', 
                      'Hit + to add new item', 
                      'Hit checkbox to delete item'
                    ];
class Item {
  constructor(name) {
    this.name = name;
  }
}

class List {
  constructor(name) {
    this.name = name;
    this.items = [];
  }
}

const defaultItems = defaultItemsText.map(itemText => new Item(itemText));
// console.log(defaultItems);
// --------------------------------------------

const client = new MongoClient('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(err => {
  if (!err) {
    console.log('Successfully connected to mongodb');
  }
});

const db = client.db('webDevBootcamp');
const lists = db.collection('lists');

// const defaultList = new List('default');
// defaultList.items = [...defaultItems];
// lists.insertOne(defaultList, err => {
//   if (!err) {
//     console.log('Inseted default list');
//   }
// }); 
// client.close();

/*
 * Does not work properly:
 * 1) TODO:to make it works - required to insert to items collection or generate id in constructor
 * 2) deleteOne does not work for some reason (no errors);
 * 3) Add list and item works
*/

app.get("/:listName", (req, res) => {
  const listName = StringUtils.capitalize(req.params.listName);
  
  lists.findOne({name: listName}, (err, list) => {
    // TODO: handle error
    if (!list) {
      const newList = new List(listName);
      newList.items = [...defaultItems];
      lists.insertOne(newList, err => {
        if (!err) {
          res.redirect(`/${listName}`);
        }
      });    
    } else {
      // console.log('list = ', list);
      res.render("listItems", {listName: listName, items: list.items});
    }
  });  
});


app.post("/:listName", (req, res) => {
  const listName = req.body.listName;
  const itemName = req.body.itemName; 
  console.log('POST: listName=', listName);

  lists.findOne({name: listName}, (err, list) => {
    if (!err) {
      const newItem = new Item(itemName);
      lists.updateOne({name: listName},
        {$push: {items: newItem}},
        err => {
        if (!err) {
          res.redirect(`/${listName}`);
        }
      });       
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

   lists.updateOne({name: listName}, 
    {$pull: {items: {_id: itemId}}}, 
    (err, list) => {
    if (!err) {
      console.log(`Removed item by id=${itemId} from ${listName} list`);
      res.redirect(`/${listName}`);
    }        
  }); 
});


app.get("/", function(req, res) {
  lists.find({}).toArray((err, lists) => {
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
  console.log(`DELETE: list by _id=${listId}`);

   lists.deleteOne({_id: listId}, (err) => {
    if (!err) {
      console.log(`Removed list by _id=${listId}`);
      res.redirect("/");
    }        
  });   
});

app.listen(9000, function(){
  console.log("Server started on port 9000.");
});

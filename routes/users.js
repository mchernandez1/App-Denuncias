const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'appusers';

//Pedir todos los users
const findDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('users');
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    //        console.log("Found the following records");
    //        console.log(docs)
    callback(docs);
  });
};

function getAllUsers(cb) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    findDocuments(db, (data) => {
      cb(data);
      client.close();
    });
  });

}

//Add a user
const insertDocuments = function (data, db, callback) {
  // Get the documents collection
  const collection = db.collection('users');
  // Insert some documents
  collection.insertOne(data, function (err, result) {
    assert.equal(err, null);
    console.log('Inserted document into the collection');
    callback(result);
  });
};

function newUser(data, cb) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    insertDocuments(data, db, (res) => {
      cb(res);
      client.close();
    });
  });
}


//Pathnames
router.get('/users', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  getAllUsers((data) => res.send(data));
});

router.post('/users', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  newUser(req.body, (result) => res.send(result));
});


module.exports = router;
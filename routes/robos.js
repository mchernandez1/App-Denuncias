const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'appDenuncias';

//Pedir todos los robos
const findDocuments = function (db, filter, callback) {
  // Get the documents collection
  const collection = db.collection('robos');
  // Find some documents
  collection.find(filter).toArray(function (err, docs) {
    assert.equal(err, null);
    //        console.log("Found the following records");
    //        console.log(docs)
    callback(docs);
  });
};

function getAllRobos(filter, cb) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    findDocuments(db, filter, (data) => {
      cb(data);
      client.close();
    });
  });

}

//Denunciar un robo
const insertDocument = function (data, db, callback) {
  // Get the documents collection
  const collection = db.collection('robos');
  // Insert some documents
  collection.insertOne(data, function (err, result) {
    assert.equal(err, null);
    console.log('Inserted document into the collection');
    callback(result);
  });
};

function insertIntoUser(data, db, callback) {
  // Get the documents collection
  const collection = db.collection('users');
  collection.updateOne({
    user: data.user
  }, {
    $push: { robos : data }
  }, function (err, result) {
    console.log('Updated the user');
    callback(result);
  });
}

function newRobo(data, cb) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    insertDocument(data, db, (res) => {
      cb(res);
      insertIntoUser(data, db, (res) => {
        cb(res);
        client.close();
      });
    });
  });
}

//Hacer reporte
function insertReporte(roboId, data, db, callback) {
  // Get the documents collection
  const collection = db.collection('robos');
  collection.updateOne({
    id: roboId
  }, {
    $push: { reportes : data }
  }, function (err, result) {
    console.log('Updated the user');
    callback(result);
  });
}

function newReporte(id, data, cb) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    insertReporte(id, data, db, (res) => {
      cb(res);
      client.close();
    });
  });
}

//Pathnames
router.get('/robos', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  getAllRobos(req.filter, (data) => res.send(data));
});

router.post('/robos', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  newRobo(req.body, (result) => res.send(result));
});

router.post('/robos/:id(\d+)/reporte', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  newReporte(req.params.id, req.body, (result) => res.send(result));
});

module.exports = router;
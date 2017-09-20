// var MongoClient = require('mongodb').MongoClient
// var assert = require('assert');
// let sunny = new Date().valueOf()
// const url = "mongodb://192.168.198.129:27017/node_club_dev?connectTimeoutMS=300000"
// MongoClient.connect(url, function (err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to server");
//     let collection = db.collection("users")

//     collection.find().toArray(
//         function (err, docs) {
//             assert.equal(null, err);
//             // console.log(docs)
//         }
//     )

//     // collection.findOne({ name: `${sunny}` }, function (err, docs) {
//     //     console.log(docs.name)
//     //     assert.equal(err, null)
//     //     assert.equal(`${sunny}`, docs.name)
//     // })
//     // collection.updateOne({ name: `${sunny}` }, { $set: { "active": true } }, function (err, docs) {
//     //     assert.equal(null, err);
//     //     console.log(docs)
//     // })
//     db.close();
// });

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://192.168.198.129:27017/node_club_dev';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  db.close();
});
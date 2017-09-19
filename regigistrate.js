

require('chromedriver')
var webdriver = require('selenium-webdriver');
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

// Connection URL 
const url = 'mongodb://192.168.198.129:3000/node_club_dev '

let By = webdriver.By;
//
let driver = new webdriver.Builder().forBrowser('chrome').build();

driver.get("http://192.168.198.129:3000/ ")
let sunny = new Date().valueOf()

driver.findElement(By.css('[href="/signup"]')).click();
driver.findElement(By.id ('loginname')).sendKeys(sunny)
driver.findElement(By.id ('pass')).sendKeys('123456')
driver.findElement(By.id ('re_pass')).sendKeys('123456')
driver.findElement(By.id ('email')).sendKeys(sunny+`@qq.com`)  // user+"@domain.com"
driver.findElement(By.css('.span-primary')).click().then(function () {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        let collection = db.collection("users")

        collection.find().toArray(
            function (err, docs) {
                assert.equal(null, err);
                // console.log(docs)
            }
        )

        collection.findOne({name: `${sunny}`},function(err,docs){
            console.log(docs.name 

)
            assert.equal(err, null)
            assert.equal(`${sunny}`,docs.name 

)
        })
        collection.updateOne({ name: `${sunny}` }, { $set: { "active": true } }, function (err, docs) {
            assert.equal(null, err);
            // console.log(docs)
        })
        db.close();
    });
})
#!/usr/bin/env node
var failures = require("./index.js"),
    Promise = require("promise"),
    fs = require("fs"),
    dir = process.argv[2];

//new Promise(function(resolve, reject) {
//    failures(function (result) {
//        console.log("%i failures");
//        resolve(result ? 1 : 0);
//    }, dir);
//}).then(process.exit);

new Promise(function (resolve, reject) {
    failures(function (err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(result ? 1 : 0);
        }
    });
})
    .then(process.exit)
    .catch(function () {
        console.error("error ", arguments);
        process.exit(1);
    });


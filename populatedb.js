#! /usr/bin/env node

console.log(
  "This script populates some test movies, directors, genres to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
    if (!userArgs[0].startsWith('mongodb')) {
        console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
        return
    }
    */
const async = require("async");
const Message = require("./models/message");
const User = require("./models/user");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const users = [];
const messages = [];

function userCreate(username, password, member, admin, cb) {
  userdetail = {
    username: username,
    password: password,
    member: member,
    admin: admin,
  };

  const user = new User(userdetail);

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New User: " + user);
    users.push(user);
    cb(null, user);
  });
}

function messageCreate(title, text, timestamp, cb) {
  const message = new Message({
    title: title,
    text: text,
    timestamp: timestamp,
  });
  message.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Message: " + message);
    messages.push(message);
    cb(null, message);
  });
}

function createUsers(cb) {
  async.series(
    [
      function (callback) {
        massageCreate("Krystian", "przykładowy tekst", false, false, callback);
      },
      function (callback) {
        messageCreate("Paweł", "Paweł", false, false, callback);
      },
    ],
    // optional callback
    cb
  );
}

function createMessages(cb) {
  async.series(
    [
      function (callback) {
        messageCreate("Text 1", "I love dogs.", Date.now(), callback);
      },
      function (callback) {
        messageCreate("Text 2", "I love cats.", Date.now(), callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createUsers, createMessages],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Success: " + results);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

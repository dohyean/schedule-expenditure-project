const express = require("express");
const path = require("path");
const dbPath = path.resolve(__dirname, `db_control.db`);

const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db_control.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the chinook database.");
});

var sqlQuery = "select * from user_data";
db.all(sqlQuery, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

sqlQuery =
  "INSERT INTO user_data(user_id, user_phone, user_email, user_name, user_SSN) VALUES('what', 'the', 'fxx', 'say', 'the')";
db.run(sqlQuery, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});

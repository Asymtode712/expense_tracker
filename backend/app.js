const express = require("express");

const app = express(); //express app, act as a middleware

const bodyParser = require("body-parser"); //imnport body-parser

const path = require('path');

const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense');
const dotenv=require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to database");
}).catch((error) => console.log(`${error} did not connect!`));


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,authentication",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use('/v1/api',expenseRoutes);
app.use('/v1/api/USER',userRoutes);

app.use(express.static(path.join(__dirname, '..', 'dist', 'expense-tracker')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'expense-tracker', 'index.html'));
});

module.exports = app;

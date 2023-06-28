const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://127.0.0.1:27071/wikiDB');

const Article = new mongoose.Schema({
  title: String,
  content: String,
  createAt: {
    type: String,
    default: new Date().toLocaleDateString('id-ID', {weekday: 'short', month: 'short', year: 'numeric', day: 'numeric'})
  }
});

const articleModel = new mongoose.model('articles', Article);
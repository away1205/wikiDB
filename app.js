const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs')

const app = express();

app.set('view-engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))

mongoose.connect('mongodb://0.0.0.0:27017/wikiDB');

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  createAt: {
    type: String,
    default: new Date().toLocaleDateString('id-ID', {weekday: 'short', month: 'short', year: 'numeric', day: 'numeric'})
  }
});

const Article = new mongoose.model('articles', ArticleSchema);

/* ----- All Articles ----- */

app.route('/articles')
  .get((req, res) => {
    Article.find({}).then(data => res.send(data))
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
  
    newArticle.save().then(err => res.send(err))
  })
  .delete((req, res) => {
    Article.deleteMany({}).then(err => res.send(err))
  });

app.listen(3000, () => {
  console.log('runnning on 3000')
})

/* ----- Specified Articles ----- */

app.route('/articles/:title')
  .get((req, res) => {
    Article.findOne({title: req.params.title}).then(data => {
      if (!data){
        res.send('No data')
      } else{
        res.send(data)
      }
    })
  })
  .put((req, res) => {
    Article.replaceOne({title: req.params.title}, req.body)
    .then(data => res.send(data))
  })
  .patch((req, res) => {
    Article.updateOne({title: req.params.title}, req.body)
    .then(data => res.send(data))
  })
  .delete((req, res) => {
    Article.deleteOne({title: req.params.title})
    .then(data => res.send(data))
  });
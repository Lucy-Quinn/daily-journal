//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { response } = require("express");
const _ = require('lodash');

const homeStartingContent = "This is your journal. Please click below to start writing your very own diary.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

//home page
app.get('/', function (req, res) {
  res.render('home', {
    starting: homeStartingContent,
    posts: posts
  });
});

//about page
app.get('/about', function (req, res) {
  res.render('about', {
    about: aboutContent
  });
});

//contact page
app.get('/contact', function (req, res) {
  res.render('contact', {
    contact: contactContent
  });
});

app.get('/compose', function (req, res) {
  res.render('compose');
});

app.post('/compose', function (req, res) {
  const post = {
    title: req.body.titleInput,
    content: req.body.postInput
  };
  posts.push(post);
  res.redirect('/');
});

//to get the value of the route => route parameters!
app.get('/posts/:postName', function (req, res) {
  let requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function (post) {
    let storedTitle = _.lowerCase(post.title);
    if (requestedTitle == storedTitle) {
      res.render('post', {
        title: post.title,
        content: post.content
      });
    }
  });
});


app.listen(process.env.PORT);



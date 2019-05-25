// 2nd connecting up express to PG
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const glob = require('glob');
const fs = require('fs');

//  CONTENTS OF .JS / .JSX FILES 

let content;
glob("**/*{.js, .jsx}",{ nosort: true, ignore: ['node_modules/**', 'server/**','__test__/**', 'webpack/**' ] }, function (er, files) {
  console.log(files);   // Files gives us an array of filenames
  files.forEach((file) => {
    fs.readFile(file, 'utf-8', function read(err, data) {
      if(err) {throw err;}
      content = data;
      console.log(content);
      processFile();
    });
  })
});

function processFile() {
  console.log(content);
};



const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

//routes

const productRoute = require('./routes/productRoute.js');

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())


// app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/api', productRoute);

app.use('/', (req, res) => {
 // res.sendFile(path.join(__dirname, '../index.html'));
  res.send('reached root route');
});


module.exports = app;

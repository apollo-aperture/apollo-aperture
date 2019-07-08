// 2nd connecting up express to PG
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const formidable = require('formidable');
const fs = require('fs');
const getFile = require('./ast/getFiles');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

// this route processes the App.js file
app.get('/api/d3json', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'App.js');
  // read the /uploads/App.js file
  fs.readFile(filePath, 'utf8', (err, file) => {
    processAST(file)
      .then(data => {
        res.json(data);
      });
  });
});

// POST route to allow user to upload a React/Apollo file
// the file is uploaded to the /uploads directory
app.post('/api/upload', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function (name, file){
    file.path = __dirname + '/uploads/' + file.name;
  });

  form.on('file', function (name, file){
    console.log('Uploaded ' + file.name);
  });
  res.send('file uploaded');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('Server listening on Port 3000')
});

// initiates AST traversal on the file passed in as an argument to processAST
function processAST(file) {
  return new Promise((resolve, reject) => {
    getFile.fileToTraverse(file)
      .then(data => {
        // console.log('got data', data);
        resolve(data);
      })
      .catch(err => {
        console.log('received err', err);
        reject(err);
      });
  });
}

/*const pathName = path.join(__dirname, '..', 'server', 'samples', 'todo', 'App.js');
fs.readFile(pathName, 'utf8', (err, file) => {
  getFile.fileToTraverse(file)
    .then(data => {
      console.log('got data', data);
    })
    .catch(err => {
      console.log('received err', err);
    });
});*/

module.exports = app;

// 2nd connecting up express to PG
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer'); // File handler
const formidable = require('formidable');
// const formidableMiddleware = require('express-formidable');
const fs = require('fs');
const getFile = require('./ast/getFiles');
const glob = require('glob');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200,
// };

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

// filename: function (req, file, cb) {
//   cb(null, Date.now() + '-' +file.originalname )
// }

// let upload = multer({ storage: storage }).single('file');
const upload = multer({storage});

/*app.post('/api/upload', upload.single('test'), (req, res, next) => {
  /!*const file = req.file;
  if (!file) {
    console.log('err');
  }*!/
  console.log('ran');
});*/

app.get('/api/d3json', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'App.js');
  fs.readFile(filePath, 'utf8', (err, file) => {
    processAST(file)
      .then(data => {
        res.json(data);
      });
  });
});

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

function processAST(file) {
  return new Promise((resolve, reject) => {
    getFile.fileToUpload(file)
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
  getFile.fileToUpload(file)
    .then(data => {
      console.log('got data', data);
    })
    .catch(err => {
      console.log('received err', err);
    });
});*/

module.exports = app;

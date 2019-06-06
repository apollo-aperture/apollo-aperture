// 2nd connecting up express to PG
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const multer = require('multer') // File handler

const www = express();
www.use(bodyParser.urlencoded({extended: true}));
www.use(bodyParser.json());
www.use(cookieParser());

// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200,
// };

www.use(cors());

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

let upload = multer({ storage: storage }).single('file');

www.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});


//routes
const productRoute = require('../routes/productRoute.js');


www.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

www.use(bodyParser.urlencoded({extended: true}));
www.use(bodyParser.json());
www.use(cookieParser())


// www.use('/build', express.static(path.join(__dirname, '../build')));
www.use('/api', productRoute);

www.use('/', (req, res) => {
 // res.sendFile(path.join(__dirname, '../index.html'));
  res.send('reached root route');
});

www.listen(8000, () => {
  console.log('Server listening on Port 8000')
})

module.exports = www;

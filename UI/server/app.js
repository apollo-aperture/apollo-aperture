// // 2nd connecting up express to PG
// const path = require('path');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors')
// const multer = require('multer') // File handler
// const app = express();
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(cookieParser());

// // const corsOptions = {
// //   origin: '*',
// //   optionsSuccessStatus: 200,
// // };

// app.use(cors());

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//   cb(null, 'public')
// },
// filename: function (req, file, cb) {
//   cb(null, Date.now() + '-' +file.originalname )
// }
// })

// var upload = multer({ storage: storage }).single('file');

// app.post('/upload',function(req, res) {
     
//   upload(req, res, function (err) {
//          if (err instanceof multer.MulterError) {
//              return res.status(500).json(err)
//          } else if (err) {
//              return res.status(500).json(err)
//          }
//     return res.status(200).send(req.file)

//   })

// });


// //routes
// const productRoute = require('./routes/productRoute.js');

// app.get('/', (req, res)=>{
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(cookieParser())


// // app.use('/build', express.static(path.join(__dirname, '../build')));
// app.use('/api', productRoute);

// app.use('/', (req, res) => {
//  // res.sendFile(path.join(__dirname, '../index.html'));
//   res.send('reached root route');
// });

// app.listen(8000, () => {
//   console.log('Server listening on Port 8000')
// })

// module.exports = app;

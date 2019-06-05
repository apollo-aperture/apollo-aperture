// 2nd connecting up express to PG
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const upload = require('./upload')
const cors = require('cors')

const www = express();
www.use(bodyParser.urlencoded({extended: true}));
www.use(bodyParser.json());
www.use(cookieParser());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

www.use(cors(corsOptions));


www.post('/upload', upload)

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

www.listen(3000, () => {
  console.log('Server listening on Port 3000')
})

module.exports = www;

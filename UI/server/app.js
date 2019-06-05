// 2nd connecting up express to PG
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const upload = require('./upload')
const cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.post('/upload', upload)

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

app.listen(8000, () => {
  console.log('Server listening on Port 8000')
})

module.exports = app;

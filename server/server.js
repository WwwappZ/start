// Main starting point of the application
const express = require('express');
const json2xls = require('json2xls');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser'); //middleware which parses HTTP request bodies and makes them available in req.body
const morgan = require('morgan');  //HTTP request logger middleware
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const {startcron} = require('./services/cron')
const config = require('./config.js')
const Startup = require('./services/startup')
mongoose.Promise = require('bluebird');

// DB Setup
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};
//mongoose.connect('mongodb://recraplan:8y3928e23hekjsh8y23h@wwwappz.nl:27017/'+config.database+'?authSource=recraplan' ,options);
mongoose.connect('mongodb://admin:VJvybFmv2yhDguwzGJ@localhost:27017/'+config.database+'?authSource=admin' ,options);
app.use(bodyParser.json());
app.use(json2xls.middleware)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));
// Allow cross-origin resource sharing
app.use(cors());

app.options('*', cors());
app.use(express.static('dest'));
// Application Routes
router(app);
Startup.checkuser();
// Server Setup
startcron();
const port = process.env.PORT || 5001;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

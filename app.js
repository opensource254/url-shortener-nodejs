const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const app = express();

require('./services/cache');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//mongoose connect
mongoose.Promise = global.Promise;
// disable this to debug the db
//mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose
    .connect('mongodb://localhost:27017/url', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((error) => console.log(error));
app.use('/', indexRouter);

module.exports = app;

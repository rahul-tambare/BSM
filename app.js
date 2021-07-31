const Student = require('./Router/Student.router');
const Store = require('./Router/Store.router');
const bodyParser = require('body-parser');
const express = require('express');
const AuthC = require('./Controlers/AuthControllers/Auth')
// const fileUpload = require('express-fileupload');
const Auth = require('./Router/Auth.router')
const imageUpload = require('./Router/image');
const path = require('path');
const app = express();
// app.use(fileUpload());
// app.use(bodyParser.json())
app.use(express.json());
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', Auth);
app.use('/store', AuthC, Store);
app.use('/student', Student);
module.exports = app;
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const swagger = require('./configs/swagger');

const userRouter = require('./routes/userRouter');
const apiRouter = require('./routes/apiRouter');

app.use(swagger);

app.use(express.static(path.join(__dirname, 'build')));

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', apiRouter);
app.use('/', userRouter);

app.listen(process.env.PORT || 8080);
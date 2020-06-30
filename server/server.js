// this is the main file for the application
const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors')

const api = require('./api')

const app = express()
app.use(cors());

app.use(bodyParser.json());
app.use(api);


app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
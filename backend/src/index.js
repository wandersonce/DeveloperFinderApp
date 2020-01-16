const express = require('express');
const mongosee = require('mongoose')
const routes = require('./routes')

const app = express();
mongosee.connect('mongodb+srv://wandersonce:f1a6r2a7@cluster0-hjikb.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(express.json())
app.use(routes);

app.listen(3333);
const express = require('express');
const mongosee = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const http = require('http')
const { setupWebsocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongosee.connect('mongodb+srv://wandersonce:f1a6r2a7@cluster0-hjikb.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(cors());
app.use(express.json())
app.use(routes);

server.listen(3333);
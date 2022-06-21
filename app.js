require('dotenv').config();
const Server = require('./models/server')
const { config } = require('dotenv');


const server = new Server();
//inicialize firebase

//server listening
server.listen();






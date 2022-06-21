const express = require('express');
let cors = require('cors')
const sequelize = require('../db/connection');
const morgan = require('morgan')

const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "otp api",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: [`${path.join(__dirname,"../routes/*.js")}`],
}

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //middlewares
        this.middlewares();
        //rutas de la aplicacion
        this.routes();
    }

    async dbConnection() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }

    }

    middlewares(){
        this.app.use(express.static('public'))
        this.app.use(cors());
        this.app.use( express.json()); 
        this.app.use(morgan('dev')); //middleware to print petitions
        this.app.use('/api-doc',swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
    }
    routes(){
        this.app.use("/api/users", require("../routes/user"))
    }
    listen(){
        this.dbConnection()
        this.app.listen(this.port, ()=>{
            console.log("Service running in port ", this.port)
        })
    }
}
module.exports = Server;
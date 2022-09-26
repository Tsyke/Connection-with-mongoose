const express = require('express');
const bd = require('body-parser');
const Path = require('path');
const Mongoose = require('./MongooseConnection');
const session = require('express-session');
class App {
    constructor(OPTIONS) {
        this.options = OPTIONS;
        this.server = null;
    }
    async create() {
        if (!this.options) throw new Error("Options is not provided")
        const app = express();
        if (this.options.useBodyParser) {
            app.use(bd.urlencoded({ extended: false }));
            app.use(bd.json());
        }

        app.use(session({
            secret: 'your secret bla bla bla',
            resave: false,
            saveUninitialized: false
        }));

        app.set('view engine', 'ejs');
        app.set('views', Path.join(__dirname, '../views'));

        app.use(express.static(Path.join(__dirname, '/../public')));

        app.listen(this.options.port, () => {
            console.log("Express server running on port: %d", this.options.port);
        });
        if (this.options.mongodb && this.options.mongodb.connection) {
            if (!this.options.mongodb.url) throw new Error("Mongoose URI is not provided");
            const db = new Mongoose({
                uri: this.options.mongodb.url,
                autoIndex: false
            });
            db.connection();
        }
        this.server = app;
    }

    debug() {
        console.log(this.options);
    }

    addRoute({ url, path }) {
        if (!this.server) throw new Error('App is not started');
        if (!(url || path)) throw new Error("URL or Path is not provided");
        this.server.use(url, require(Path.resolve(__dirname + "/../" + path)));
    }
}

module.exports = App;
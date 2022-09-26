const { connect } = require("mongoose");

class Mongoose {
    constructor(OPTIONS) {
        this.options = OPTIONS;
    }

    async connection() {
        if(!this.options.uri) throw new Error("MongoDB URL is not provided")
        connect(this.options.uri, {
            autoIndex: this.options.autoIndex
        }).then((db) => {
            console.log("Mongoose Database is connected");
        });
    }

    debug() {
        console.log(this.options);
    }
}

module.exports = Mongoose;
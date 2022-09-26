const { genSalt, hash } = require("bcrypt");
const { sleep } = require("../lib/functions");
const UserModel = require("../models/User");

class User {
    constructor(OPTIONS) {
        this.options = OPTIONS;
        this._salt = '$2b$10$f59zClQshsqE.zHgn85q5.';
    }
    async create({ username, email, password, name, firstname }) {
        if (!(username || email || password || name || firstname)) throw new Error('No options provided for User.create');
        if (!(username || email || password || name || firstname)) throw new Error("User options error");
        else {
            const searchEmail = await UserModel.findOne({ email: email });
            if (searchEmail) return 15469; // Email is unavailable
            else {
                const searchUsername = await UserModel.findOne({ username: username });
                if (searchUsername) return 26874; // Username is unavailable
                else {
                    await hash(password, this._salt, function (err, hash) {
                        if (err) throw new Error(err);
                        new UserModel({
                            userId: Math.floor(Date.now() * 1000),
                            username: username,
                            email: email,
                            firstname: firstname,
                            name: name,
                            password: hash.toString()
                        }).save()
                        return 200; // OK
                    });
                    return 200;
                }
            }
        }
    }

    async connect({ username, password }) {
        if (!(username || password)) throw new Error('No options provided for User.connect');
        let result
        await hash(password, this._salt, async function (err, hash) {
            if (err) throw new Error(err);
            const verif = await UserModel.findOne({ username: username });
            if(verif) {
                if(verif.password === hash.toString()) return result = verif;
                else {
                    return result = 36578; // Username or password error
                }
            } else {
                return result = 36578; // Username or password error
            }
        });
        await sleep(500)
        return result
    }

    async debug({ option }) {
        if (option === "regentoken") {
            console.log(await genSalt())
        }
    }
}

module.exports = User;
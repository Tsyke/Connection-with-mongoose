const session = require('express-session');
const User = require('../class/User');
const { ErrorCode } = require('../lib/ErrorCode');
const UserOption = new User();
const router = require('express').Router();

router.use(session({
    secret: 'your secret bla bla bla',
    resave: false,
    saveUninitialized: false
}));

router.post("/login", async (req, res) => {
    if(req.session.user) return res.redirect("/user/profile");
    const connection = await UserOption.connect({ username: req.body.username, password: req.body.password });
    console.log(connection);
    if(ErrorCode.includes(connection)) {
        if(connection === 15469) res.redirect("/auth/login?err=15469")
        if(connection === 26874) res.redirect("/auth/login?err=26874")
        if(connection === 36578) res.redirect("/auth/login?err=36578")
    }
    else if(connection) {
        req.session.user = connection;
        res.redirect('/user/profile');
    }
});

router.post("/register", async (req, res) => {
    if(req.session.user) return res.redirect("/user/profile");
    const { username, email, name, firstname, password, passwordConfirm } = req.body;
    if(password !== passwordConfirm) return res.redirect("/auth/register?err=37845");
    else {
        const user = await UserOption.create({ username, email, password, name, firstname });
        console.log(user);
        if(user === 15469) return res.redirect("/auth/register?err=" + `${user}`);
        if(user === 26874) return res.redirect("/auth/register?err=" + `${user}`);
        if(user === 200) return res.redirect("/auth/login?ok=200");
    }
});
module.exports = router;
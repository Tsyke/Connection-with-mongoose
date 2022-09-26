const session = require('express-session');

const router = require('express').Router();

router.use(session({
    secret: 'your secret bla bla bla',
    resave: false,
    saveUninitialized: false
}));

router.get("/login", (req, res) => {
    if (req.session.user) return res.redirect("/user/profile");
    console.log(req.query?.ok === 200 ? true : false );
    res.render("auth/login", { 
        err: req.query.err === '36578' ? "Nom d'utilisateur ou mot de passe incorrect" : undefined, 
        success: req.query?.ok === 200 ? true : false    
    });
});

router.get("/register", (req, res) => {
    if (req.session.user) return res.redirect("/user/profile");
    res.render("auth/register", {
        err:
            req.query.err === '36578' ? "Nom d'utilisateur ou mot de passe incorrect" : 
            req.query.err === '26874' ? "Nom d'utilisateur déjà utilisé" : 
            req.query.err === '15469' ? "Email déjà utiliser" : 
            req.query.err === "37845" ? "Les mots de passe ne correspondent pas" : 
            null
    });
});

module.exports = router;
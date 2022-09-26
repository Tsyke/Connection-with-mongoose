const router = require('express').Router();

router.get("/profile", (req, res) => {
    console.log(req.session);
    if(!req.session.user) return res.redirect("/auth/login")
    res.render("user/profile", {
        user: req.session.user
    });
});

module.exports = router;
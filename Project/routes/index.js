var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "Welcome to Rev's",
        isAuthenticated: req.oidc.isAuthenticated(),
        user: req.oidc.user,
    });
});

module.exports = router;

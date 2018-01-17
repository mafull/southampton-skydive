var express 	= require("express"),
	passport 	= require("passport");

var router = express.Router();

var User = require("../models/user");

router.get("/register", function(req, res) {
	res.render("register");
});

router.post("/register", function(req, res) {
	User.register(req.body.user, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render("register");
		}

		passport.authenticate("local")(req, res, function() {
			res.redirect("/");
		});
	});
});

router.get("/login", function(req, res) {
	res.render("login");
});

router.post("/login",
	passport.authenticate(
		"local", 
		{
			successRedirect: "/",
			failureRedirect: "/login"
		}
	),
	function(req, res) {

});

router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});


function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
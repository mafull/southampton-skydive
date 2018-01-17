var express 	= require("express"),
	passport 	= require("passport");
var router = express.Router();

var middleware = require("../middleware");

var User = require("../models/user");


// Index
router.get("/", function(req, res) {
	res.render("landing");
});


// New
router.get("/register", function(req, res) {
	res.render("register");
});


// Create
router.post("/register", function(req, res) {
	var newUser = req.body.user;
	if(newUser.username == "admin") {
		newUser.isAdmin = true;
	}

	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("/register");
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
			failureRedirect: "/login",
			successFlash: "Logged in successfully",
			failureFlash: "Invalid username or password!"
		}
	),
	function(req, res) {

});


router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

module.exports = router;
var express 	= require("express"),
	passport 	= require("passport");
var router = express.Router();

const {check, validationResult} = require("express-validator/check");
const {matchedData, sanitize} = require("express-validator/filter");

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
router.post("/register", [
	// First name
	check("user[forename]")
		// Check it exists and only contains letters
		.isLength({min: 1}).withMessage("Please enter your first name")
		.isAlpha().withMessage("First name must only contain letters"),

	// Surname
	check("user[surname]")
		// Check it exists and only contains letters
		.isLength({min: 1}).withMessage("Please enter your surname")
		.isAlpha().withMessage("Surname must only contain letters"),

	// Email
	check("user[email]", "Please enter a valid email address")
		// Check it exists and is of a valid email address format
		.isLength({min: 1})
		.isEmail()

		.trim()
		.normalizeEmail(),

	// Username
	check("user[username]", "Please enter a username that is at least 5 characters long")
		// Check it is of the required format
		.isLength({min: 5}),

	// Password
	check("password", "Please enter a password that is at least 5 characters long and includes a number")
		// Check it is of the required format
		.isLength({min: 5})
		.matches(/\d/)

	], (req, res, next) => {
		const validationErrors = validationResult(req);
		if(!validationErrors.isEmpty()) {
			//return res.render("register", {validationErrors: validationErrors});
			return res.status(422).json({errors: validationErrors.mapped()});
		}

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
	}
);


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
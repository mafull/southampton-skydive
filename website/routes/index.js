var express 				= require("express"),
	connectFlash			= require("connect-flash"),
	passport 				= require("passport"),
	LocalStrategy			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose");
var router = express.Router();

const {check, validationResult} = require("express-validator/check");
const {matchedData, sanitize} = require("express-validator/filter");

var middleware = require("../middleware");

var User = require("../models/user");

// Passport config
router.use(require("express-session")({
	secret: "This secret is used for encoding and decoding",
	resave: false,
	saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(connectFlash());

router.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.message = {
		error: req.flash("error"),
		success: req.flash("success"),
		info: req.flash("info")
	};
	next();
});


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
		newUser.username = newUser.email;

		if(newUser.forename == "UoS" && newUser.surname == "Admin") {
			newUser.isAdmin = true;
		}

		User.register(newUser, req.body.password, function(err, user) {
			if(err) {
				if(err.name === "UserExistsError") {
					err.message = "A user with the given email address is already registered";
				}
				req.flash("error", err.message);
				return res.redirect("/register");
			}

			res.redirect("/login");
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

	}
);


router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
});

module.exports = router;
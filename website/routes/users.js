var express = require("express");
var router = express.Router();

var middleware = require("../middleware");

var Rig = require("../models/user");


// Index
router.get("/", function(req, res) {
	Rig.find({}, function(err, users) {
		if(err) {
			// DO SOMEHING
		}

		res.render("users/index", {users: users});
	});	
});


// Show
router.get("/:id", function(req, res) {
	Rig.findById(req.params.id, function(err, foundUser) {
		if(err) {
			req.flash("error", "User not found!");
			res.redirect("/users");
		}

		res.render("users/show", {rig: foundUser});
	});
	
});

module.exports = router;
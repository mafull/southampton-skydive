var express = require("express");
var router = express.Router();

var middleware = require("../middleware");

var User = require("../models/user");
var Rig = require("../models/rig");


// Index
router.get("/", function(req, res) {
	User.find({}, function(err, users) {
		if(err) {
			// DO SOMEHING
		}

		res.render("users/index", {users: users});
	});	
});


// Show
router.get("/:id", function(req, res) {
	User.findById(req.params.id).populate({
		path: "approvedRigs",
		options: {
			// Sort biggest to smallest, docile to sporty
			sort: {
				"main.size": -1,
				"name": 1
			}
		}
	}).exec(function(err, foundUser) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("/users");
		}

		res.render("users/show", {user: foundUser});
	});	
});

module.exports = router;
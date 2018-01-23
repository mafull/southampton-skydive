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
	User.findById(req.params.id).populate("approvedRigs").exec(function(err, foundUser) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("/users");
		}

		//if(foundUser.surname === "Fuller") {
			// Rig.findOne({}, function(err, foundRig) {
			// 	if(err) {
			// 		return console.log(err);
			// 	}

			// 	console.log("FOUND RIG: " + foundRig);

			// 	if(!Array.isArray(foundRig.approvedUsers)) {
			// 		foundRig.approvedUsers = [];
			// 	}
			// 	foundRig.approvedUsers.push(foundUser._id);
			// 	foundRig.save(function(err, data) {
			// 		if(err) {
			// 			return console.log(err);
			// 		}

			// 		// DO SOMETHING
			// 	});
			// });
		//}
		

		res.render("users/show", {user: foundUser});
	});	
});

module.exports = router;
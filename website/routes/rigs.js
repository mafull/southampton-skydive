var express 	= require("express"),
	mongoose 	= require("mongoose");
var router = express.Router();

var middleware = require("../middleware");

var Rig = require("../models/rig");
var User = require("../models/user");


// Index
router.get("/", function(req, res) {
	Rig.find({}, function(err, rigs) {
		if(err) {
			// DO SOMETHING
		}	

		res.render("rigs/index", {rigs: rigs});	
	});	
});


// New
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("rigs/new");
});


// Create
router.post("/", middleware.isLoggedIn, function(req, res) {
	var rig = {
		name: req.body.name,
		main: req.body.main,
		reserve: req.body.reserve
	};	

	Rig.create(rig, function(err, rig) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}

		req.flash("success", "New rig created successfully");
		res.redirect("/rigs");
	});
});


// Show
router.get("/:id", function(req, res) {
	Rig.findById(req.params.id).populate({
		path: "approvedUsers",
		options: {
			// Sort alphabetically by first name then surname
			sort: {
				"forename": 1,
				"surname": 1
			}
		}
	}).exec(function(err, foundRig) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("/rigs");
		}

		res.render("rigs/show", {rig: foundRig});					
	});	
});


// Edit
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
	Rig.findById(req.params.id, function(err, foundRig) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}

		User.find({}, function(err, users) {
			if(err) {
				return res.render("rigs/edit", {rig: foundRig, users: []});
			}

			res.render("rigs/edit", {rig: foundRig, users: users});
		});
	});
	
});


// Update
router.put("/:id", middleware.isLoggedIn, function(req, res) {
	var approvedUsers = req.body.approvedUsers.length ? req.body.approvedUsers.split(',') : [];

	var rig = {
		name: req.body.name,
		modified: Date.now(),
		main: req.body.main,
		reserve: req.body.reserve,
		approvedUsers: approvedUsers
	};

	Rig.findById(req.params.id, function(err, existingRig) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}

		var prevApprovedUsers = existingRig.toJSON().approvedUsers;

		// Add all new users
		approvedUsers.forEach(function(user) {
			var exists = false;

			// Check if user was present in previous array
			prevApprovedUsers.some(function(prevUser) {
				if(prevUser.equals(user)) {
					// Found user
					exists = true;
					return exists;
				}
			});

			// If new user
			if(!exists) {
				User.findById(user, function(err, foundUser) {
					if(err) {
						req.flash("error", err.message);
						return res.redirect("back");
					}

					if(!foundUser.toJSON().approvedRigs.filter(e => e.equals(existingRig._id)).length) {
						foundUser.approvedRigs.push(existingRig._id);
					}
					foundUser.save(function(err) {
						if(err) {
							req.flash("error", err.message);
							return res.redirect("back");
						}

					});
				});
			}			
		});


		// Update all removed users
		prevApprovedUsers.forEach(function(prevUser) {
			var exists = false;

			// Check if user is present in new array
			approvedUsers.some(function(user) {
				if(prevUser.equals(user)) {
					// Found user
					exists = true;
					return exists;
				}
			});

			// If removed user
			if(!exists) {
				console.log("USER REMOVED: ");
				User.findById(prevUser, function(err, foundUser) {
					if(err) {
						req.flash("error", err.message);
						return res.redirect("back");
					}

					// Remove rig from user
					var currentApproved = foundUser.toJSON().approvedRigs;
					foundUser.approvedRigs = currentApproved.filter(e => !e.equals(existingRig._id));
					foundUser.save(function(err) {
						if(err) {
							req.flash("error", err.message);
							return res.redirect("back");
						}
					});
				});
			}			
		});


		existingRig.approvedUsers = approvedUsers;
		existingRig.save(function(err) {
			if(err) {
				req.flash("error", err.message);
				return res.redirect("back");
			}

			req.flash("success", "Rig successfully updated");
			res.redirect("/rigs/" + req.params.id);
		});		
	});
});


// Destroy
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
	Rig.findById(req.params.id).populate("approvedUsers").exec(function(err, foundRig) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}

		// Delete all instances of the rig in approved users
		foundRig.approvedUsers.forEach(function(user) {
			var currentApproved = user.toJSON().approvedRigs;
			user.approvedRigs = currentApproved.filter(e => !e.equals(foundRig._id));
			user.save(function(err) {
				if(err) {
					req.flash("error", err.message);
					return res.redirect("back");
				}
			});
		});

		// Delete the rig
		foundRig.remove(function(err) {
			if(err) {
				req.flash("error", err.message);
				return res.redirect("back");
			}

			req.flash("success", "Rig successfully deleted");
			res.redirect("/rigs");
		});
	});
});

module.exports = router;
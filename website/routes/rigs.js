var express 	= require("express"),
	mongoose 	= require("mongoose"),
	multer		= require("multer");
var router = express.Router();
var upload = multer();

var middleware = require("../middleware");

var Rig = require("../models/rig");
var User = require("../models/user");


// Index
router.get("/", function(req, res) {
	Rig.find({}).sort([
			["main.size", -1],
			["name", 1]
		]).exec(function(err, rigs) {
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
	Rig.findById(req.params.id)
		.populate({
			path: "approvedUsers",
			options: {
				// Sort alphabetically by first name then surname
				sort: {
					"forename": 1,
					"surname": 1
				}
			}
		})
		.populate("status.bookings.user")
		.exec(function(err, foundRig) {
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

		User.find({}).sort([
			["forename", 1],
			["surname", 1]
		]).exec(function(err, users) {
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
		
		existingRig.name = req.body.name;
		existingRig.modified = Date.now();
		existingRig.main = req.body.main;
		existingRig.reserve = req.body.reserve;
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


// ----- Rig booking -----
// Create
router.post("/:id/booking", middleware.isLoggedIn, upload.fields([]), function(req, res) {
	var booking = {
		date: req.body.date,
		user: req.body.user,
		requirement: req.body.requirement,
		priority: 0		
	}

	// HANDLE PRIORITY

	Rig.findById(req.params.id, function(err, existingRig) {
		if(err) {
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("back");
		}
		
		existingRig.status.bookings.push(booking);
		existingRig.save(function(err, data) {
			if(err) {
				console.log(err);
				req.flash("error", err.message);
				return res.redirect("back");
			}

			req.flash("success", "Booking successfully added");
			res.redirect("/rigs/" + req.params.id);
		});

		
	});

	// // res.redirect("/rigs/" + req.params.id);
	// res.sendStatus(200);
});


module.exports = router;
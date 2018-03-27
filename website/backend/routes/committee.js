var express 	= require("express"),
	mongoose 	= require("mongoose");
var router = express.Router();

var middleware = require("../middleware");


var CommitteePosition = require("../models/committeePosition");
var User = require("../models/user");


// Index
router.get("/", (req, res) => {
	CommitteePosition
		.find({})
		.populate("user")
		.sort([
			["tier", 1]
		])
		.exec((err, foundPositions) => {
			if(err) {
				return res.status(404).send("Unable to retrieve committee position data");
			}

			// Return committee position data
			res.json(foundPositions);
		});
});


// New
router.get("/new", middleware.isLoggedIn, function(req, res) {
	User.find({isCommittee: false})
		.sort([
			["forename", 1],
			["surname", 1]
		]).exec(function(err, foundUsers) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}

		res.render("committee/new", {users: foundUsers});
	});
});


// Create
router.post("/", /*middleware.isLoggedIn, */(req, res) => {
	var tier = 4;
	var titleLow = req.body.title.toLowerCase();
	if((titleLow == "president") || (titleLow.indexOf("chair") >= 0)) {
		tier = 1;
	} else if(titleLow.indexOf("vice") >= 0) {
		tier = 2;
	} else if(titleLow == "treasurer") {
		tier = 3;
	}

	var user = req.body.userId ? req.body.userId : null;
	position = {
		title: req.body.title,
		user: user,
		description: req.body.description,
		tier: tier
	};

	CommitteePosition.create(position, (err, position) => {
		if(err) {
			return res.status(404).send("Unable to save committee position data");
		}

		res.json({});
	});
});


// Show
router.get("/:id", (req, res) => {
	CommitteePosition
		.findById(req.params.id)
		.populate("user")
		.exec((err, foundPosition) => {
			if(err) {
				return res.status(404).send("Unable to retrieve committee position data");
			}

			// Return committee position data
			res.json(foundPosition);
		});
});


// Edit
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
	CommitteePosition.findById(req.params.id, function(err, foundPosition) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}

		User.find({
			$or: [
				{isCommittee: false},
				{committeePosition: foundPosition._id}
			]
		}).sort([
			["forename", 1],
			["surname", 1]
		]).exec(function(err, foundUsers) {
			if(err) {
				return res.render("committee/edit", {position: foundPosition, users: []});
			}

			res.render("committee/edit", {position: foundPosition, users: foundUsers});
		});
	});
});


// Update
router.put("/:id", middleware.isLoggedIn, function(req, res) {
	var user = req.body.user.length ? req.body.user : null;
	CommitteePosition.findById(req.params.id, function(err, existingPosition) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}

		var prevUser = existingPosition.toJSON().user;

		// Remove position from previous user if necessary
		if(!prevUser || prevUser.equals(user)) {
			// Do nothing
		} else {
			User.findById(prevUser, function(err, prevUser) {
				if(err) {
					req.flash("error", err.message);
					return res.redirect("back");
				}

				prevUser.committeePosition = null;
				prevUser.isCommittee = false;
				prevUser.save(function(err) {
					if(err) {
						req.flash("error", err.message);
						return res.redirect("back");
					}
				});
			});
		}

		// Add position to new user if necessary
		if(!user || (prevUser && prevUser.equals(user))) {
			// Do nothing
		} else {
			User.findById(user, function(err, newUser) {
				if(err) {
					req.flash("error", err.message);
					return res.redirect("back");
				}

				newUser.committeePosition = existingPosition._id;
				newUser.isCommittee = true;
				newUser.save(function(err) {
					if(err) {
						req.flash("error", err.message);
						return res.redirect("back");
					}
				});
			});	
		}

		// Find the position tier
		var tier = 4;
		var nameLow = req.body.name.toLowerCase();
		if((nameLow == "president") || (nameLow.indexOf("chair") >= 0)) {
			tier = 1;
		} else if(nameLow.indexOf("vice") >= 0) {
			tier = 2;
		} else if(nameLow == "treasurer") {
			tier = 3;
		}

		// Update position
		existingPosition.name = req.body.name;
		existingPosition.user = user;
		existingPosition.description = req.body.description;
		existingPosition.tier = tier;
		existingPosition.modified = Date.now();
		existingPosition.save(function(err) {
			if(err) {
				req.flash("error", err.message);
				return res.redirect("back");
			}

			req.flash("success", "Position successfully updated");
			res.redirect("/committee/" + req.params.id);
		});
	});
});


// Destroy
router.delete("/:id", /*middleware.isLoggedIn, */(req, res) => {
	CommitteePosition
		.findById(req.params.id)
		.populate("user")
		.exec((err, foundPosition) => {
			if(err) {
				return res.status(404).send("Unable to retrieve committee position data");
			}

			// Remove position from currently-assigned user if necessary
			if(foundPosition.user) {
				foundPosition.user.committeePosition = null;
				foundPosition.user.isCommittee = false;
				foundPosition.user.save(err => {
					if(err) {
						return res.status(404).send("Unable to retrieve committee position data");
					}
				});
			}

			// Delete the position
			foundPosition.remove(err => {
				if(err) {
					return res.status(404).send("Unable to retrieve committee position data");
				}

				res.json({});
			});
		});
});

module.exports = router;
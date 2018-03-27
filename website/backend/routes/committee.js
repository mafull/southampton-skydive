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


// Create
router.post("/", /*middleware.isLoggedIn, */(req, res) => {
	let tier = 4;
	const titleLow = req.body.title.toLowerCase();

	if((titleLow == "president") || (titleLow.indexOf("chair") >= 0)) {
		tier = 1;
	} else if(titleLow.indexOf("vice") >= 0) {
		tier = 2;
	} else if(titleLow == "treasurer") {
		tier = 3;
	}

	const newPosition = {
		title: req.body.title,
		tier: tier,
		description: req.body.description,
		user: req.body.user ? req.body.user : null
	};

	CommitteePosition.create(newPosition, (err, createdPosition) => {
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
router.get("/:id/edit", /*middleware.isLoggedIn, */(req, res) => {
	CommitteePosition.findById(req.params.id, (err, foundPosition) => {
		if(err) {
			return res.status(404).send("Unable to retrieve committee position data");
		}

		User
			.find({
				$or: [
					{isCommittee: false},
					{committeePosition: foundPosition._id}
				]
			})
			.sort([
				["forename", 1],
				["surname", 1]
			])
			.exec((err, foundUsers) => {
				if(err) {
					return res.status(404).send("Unable to retrieve committee position data");
				}

				res.json({ 
					position: foundPosition,
					users: foundUsers
				});
			});
	});
});


// Update
router.put("/:id", /*middleware.isLoggedIn, */(req, res) => {
	const user = req.body.user.length ? req.body.user : null;
	CommitteePosition.findById(req.params.id, (err, foundPosition) => {
		if(err) {
			return res.status(404).send("Unable to retrieve committee position data");
		}

		const prevUser = foundPosition.toJSON().user;

		// Remove position from previous user if necessary
		if(!prevUser || prevUser.equals(user)) {
			// Do nothing
		} else {
			User.findById(prevUser, (err, foundUser) => {
				if(err) {
					return res.status(404).send("Unable to retrieve committee position data");
				}

				foundUser.committeePosition = null;
				foundUser.isCommittee = false;
				foundUser.save((err) => {
					if(err) {
						return res.status(404).send("Unable to retrieve committee position data");
					}
				});
			});
		}

		// Add position to new user if necessary
		if(!user || (prevUser && prevUser.equals(user))) {
			// Do nothing
		} else {
			User.findById(user, (err, foundUser) => {
				if(err) {
					req.flash("error", err.message);
					return res.redirect("back");
				}

				foundUser.committeePosition = foundPosition._id;
				foundUser.isCommittee = true;
				foundUser.save((err) => {
					if(err) {
						return res.status(404).send("Unable to retrieve committee position data");
					}
				});
			});	
		}

		// Find the position tier
		var tier = 4;
		var titleLow = req.body.title.toLowerCase();
		if((titleLow == "president") || (titleLow.indexOf("chair") >= 0)) {
			tier = 1;
		} else if(titleLow.indexOf("vice") >= 0) {
			tier = 2;
		} else if(titleLow == "treasurer") {
			tier = 3;
		}

		// Update position
		foundPosition.title = req.body.title;
		foundPosition.user = user;
		foundPosition.description = req.body.description;
		foundPosition.tier = tier;
		foundPosition.modified = Date.now();
		foundPosition.save(function(err) {
			if(err) {
				return res.status(404).send("Unable to retrieve committee position data");
			}

			res.json({});
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
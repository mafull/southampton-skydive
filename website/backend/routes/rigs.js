var express 	= require("express"),
	mongoose 	= require("mongoose"),
	multer		= require("multer");
var router = express.Router();
var upload = multer();

var middleware = require("../middleware");

var Rig = require("../models/rig");
var RigBooking = require("../models/rigBooking");
var User = require("../models/user");


// Index
router.get("/", (req, res) => {
	Rig
		.find({})
		.sort([
			["equipment.main.size", -1],
			["name", 1]
		])
		.exec((err, rigs) => {
			if(err) {
				return res.status(404).send("Unable to retrieve rig data");
			}	

			// Return rig data
			res.json(rigs);	
		});	
});


// Create
router.post("/", /*middleware.isLoggedIn, */(req, res) => {
	var rig = {
		name: req.body.name,
		main: req.body.equipment.main,
		equipment: req.body.equipment,
		approvedUsers: req.body.approvedUsers
	};	

	Rig.create(rig, function(err, rig) {
		if(err) {
			return res.status(404).send("Unable to save rig data");
		}

		res.json({});
	});
});


// Show
router.get("/:id", (req, res) => {
	Rig
		.findById(req.params.id)						// Find the rig
		.populate({										// Populate approved users
			path: "approvedUsers",
			options: {
				sort: {									// Sort alphabetically by first name then surname
					"forename": 1,
					"surname": 1
				}
			}
		})
		.populate({										// Populate bookings
			path: "bookings",
			options: {
				sort: { "priority": 1 }
			},
			populate: { path: "user" }					// Populate bookings' user
		})
		.exec((err, foundRig) => {
			if(err) {
				return res.status(404).send("Unable to retrieve rig data");
			}

			// Return rig data
			res.json(foundRig);					
		});	
});


// Edit
router.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
	Rig.findById(req.params.id, (err, foundRig) => {
		if(err) {
			return res.status(404).send("Unable to retrieve rig data");
		}

		User
			.find({})
			.sort([
				["forename", 1],
				["surname", 1]
			])
			.exec((err, users) => {
				if(err) {
					return res.status(404).send("Unable to retrieve rig data");
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

		// TODO - Delete all instances of the rig in rig bookings
		// + those bokings from users

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
router.post("/:id/booking", middleware.isLoggedIn, function(req, res) {
	// Create the new booking (local) object
	const newBooking = req.body;

	// Find all existing bookings for this day and rig
	RigBooking.find({
		"date": newBooking.date,
		"rig": newBooking.rig
	})
	// Sort by priority
	.sort([["priority", 1]])
	// Populate the user fields
	.populate("user").exec((err, foundBookings) => {
		if(err) {
			// HANDLE ERROR
			return console.log(err);
		}

		// --- Calculate and adjust priorities ---
		const newReqPriority = (newBooking.requirement === "Fun jumping" ? 2 : newBooking.requirement === "Coaching" ? 1 : 0);
		for(let i = 0; i < foundBookings.length; i++) {
			const reqPriority = (foundBookings[i].requirement === "Fun jumping" ? 2 : foundBookings[i].requirement === "Coaching" ? 1 : 0);

			if(newReqPriority < reqPriority) {
				// New booking has a higher priority

				// New booking takes the currently-selected priority
				newBooking.priority = foundBookings[i].priority;

				// Other priorities are incremented
				for(let j = i; j < foundBookings.length; j++) {
					foundBookings[j].priority++;
				}

				// Done
				break;

			} else if(newReqPriority === reqPriority) {
				// Priorities are the same

				// Check membership status etc.
				// TODO - IMPLEMENT THIS
				if(true /*SOMETHING*/) {
					// New booking has lower membership priority
					continue;
				} else {
					// New booking has higher membership priority

					// DO SOMETHING

					// New booking takes the currently-selected priority
					newBooking.priority = foundBookings[i].priority;

					// Other priorities are incremented
					for(let j = i; j < foundBookings.length; j++) {
						foundBookings[j].priority++;
					}

					// Done
					break;
				}

			} else {
				// New booking has a lower priority
				continue;
			}
		}

		// Lowest priority on chosen the day (or only booking)
		if(newBooking.priority === -1) {
			newBooking.priority = (foundBookings.length > 0) ? foundBookings[foundBookings.length-1].priority + 1 : 0;
		}


		// Create a document for the new booking
		RigBooking.create(newBooking, (err, createdBooking) => {
			if(err) {
				// HANDLE ERROR
				return console.log(err.msg);
			}

			// Update the existing bookings
			foundBookings.forEach((booking) => booking.save().catch(err => console.log(err.message)));

			// Add the new booking to the relevant rig
			Rig.update(
				{_id: req.params.id},
				{$push: {"bookings": createdBooking}},
				{safe: true, upsert: true, new: true})
				.catch(err => console.log(err.message));

			// Add the new booking to the relevant user
			User.update(
				{_id: newBooking.user},
				{$push: {"rigBookings": createdBooking}},
				{safe: true, upsert: true, new: true})
				.catch(err => console.log(err.message));


			// Add the updated bookings to the response
			RigBooking.findById(createdBooking._id).populate("user").exec((err, populated) => {
				if(err) {
					// HANDLE ERROR
					return console.log(err.message);
				}
				foundBookings.push(populated);
				res.json(foundBookings);				
			});
		});
	});
});


// Destroy
router.delete("/:id/booking", middleware.isLoggedIn, function(req, res) {
	const userToCancel = req.body.userToCancel;
	const bookingDate = req.body.bookingDate;

	// Find all bookings for this day and rig
	RigBooking.find({
		"date": bookingDate,
		"rig": req.params.id
	})
	// Sort by priority
	.sort([["priority", 1]])
	// Populate the user fields
	.populate("user").exec((err, foundBookings) => {
		if(err) {
			// TODO - HANDLE ERROR
			return console.log(err.message);
		}

		let bookingToDelete = null;
		for(let i = 0; i < foundBookings.length; i++) {
			if(foundBookings[i].user._id.equals(userToCancel)) {
				bookingToDelete = foundBookings[i];

				// Decrement the remaining priorities
				for(let j = i+1; j < foundBookings.length; j++) {
					foundBookings[j].priority--;

					foundBookings[j].save().catch(err => console.log(err.message));
				}
			}
		}

		if(bookingToDelete === null) {
			// SOMETHING IS WRONG
			return console.log("bookingToDelete is null...");
		}

		// Remove the booking from the rig it is associated with
		Rig.findById(bookingToDelete.rig, (err, foundRig) => {
			if(err) {
				// TODO - HANDLE ERROR
				return console.log(err.message);
			}

			foundRig.bookings = foundRig.bookings.filter(e => !e.equals(bookingToDelete._id));
			foundRig.save().catch(err => console.log(err.message));
		});

		// Remove the booking from the user it is associated with
		User.findById(bookingToDelete.user._id, (err, foundUser) => {
			if(err) {
				// TODO - HANDLE ERROR
				return console.log(err.message);
			}

			foundUser.rigBookings = foundUser.rigBookings.filter(e => !e.equals(bookingToDelete._id));
			foundUser.save().catch(err => console.log(err.message));
		});

		// Remove the booking from the array
		foundBookings = foundBookings.filter(e => !e._id.equals(bookingToDelete._id));

		// Delete the actual booking
		bookingToDelete.remove().catch(err => console.log(err.message));

		// Return he updated array
		res.json(foundBookings);
	});
});

module.exports = router;
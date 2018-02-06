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
router.post("/:id/booking", middleware.isLoggedIn, function(req, res) {
	const newBooking = req.body;

	Rig.findById(req.params.id, function(err, existingRig) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}


		// -------------------------------------------------------
		let bookingsOnDay = existingRig.status.bookings.filter(a => a.date.toISOString() === newBooking.date);
		bookingsOnDay.sort((a, b) => (a.priority < b.priority) ? -1 : ((b.priority < a.priority) ? 1 : 0));

		const newReqPriority = (newBooking.requirement === "Fun jumping" ? 2 : newBooking.requirement === "Coaching" ? 1 : 0);
		for(let i = 0; i < bookingsOnDay.length; i++) {
			const reqPriority = (bookingsOnDay[i].requirement === "Fun jumping" ? 2 : bookingsOnDay[i].requirement === "Coaching" ? 1 : 0);

			if(newReqPriority < reqPriority) {
				// New booking has a higher priority

				// New booking takes the currently-selected priority
				newBooking.priority = bookingsOnDay[i].priority;

				// Other priorities are incremented
				for(let j = i; j < bookingsOnDay.length; j++) {
					bookingsOnDay[j].priority++;
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
					newBooking.priority = bookingsOnDay[i].priority;

					// Other priorities are incremented
					for(let j = i; j < bookingsOnDay.length; j++) {
						bookingsOnDay[j].priority++;
					}

					break;
				}

			} else {
				// New booking has a lower priority
				continue;
			}
		}

		if(newBooking.priority === -1) {
			newBooking.priority = (bookingsOnDay.length > 0) ? 
				bookingsOnDay[bookingsOnDay.length-1].priority + 1 : 0;
		}
		


		// -------------------------------------------------------
		
		existingRig.status.bookings.push(newBooking);
		existingRig.save(function(err, data) {
			if(err) {
				req.flash("error", err.message);
				return res.redirect("back");
			}

			Rig.findById(req.params.id)
			.populate("status.bookings.user")
			.exec(function(err, foundRig) {
				if(err) {
					req.flash("error", err.message);
					return res.redirect("/rigs/" + req.params.id);
				}

				res.json(foundRig.status.bookings);						
			});
		});		
	});
});


// Destroy
router.delete("/:id/booking", middleware.isLoggedIn, function(req, res) {
	const userToCancel = req.body.userToCancel;
	const bookingDate = req.body.bookingDate;

	Rig.findById(req.params.id).exec(function(err, existingRig) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}

		// Find indices of all bookings for this date
		let iBookingsOnDate = [];
		for(let i = 0; i < existingRig.status.bookings.length; i++) {
			if(existingRig.status.bookings[i].date.toISOString() === bookingDate) {
				iBookingsOnDate.push(i);
			}
		}

		// Find index of booking to cancel
		let iBookingToCancel;
		iBookingsOnDate.some(i => {
			if(existingRig.status.bookings[i].user.equals(userToCancel)) {
				iBookingToCancel = i;
				return true;
			}
		});

		// Decrement priorities of other bookings where necessary
		const cancelledBookingPriority = existingRig.status.bookings[iBookingToCancel].priority;
		iBookingsOnDate.forEach(i => {
			if(existingRig.status.bookings[i].priority > cancelledBookingPriority) {
				existingRig.status.bookings[i].priority--;
			}
		});

		// Remove booking		
		existingRig.status.bookings.splice(iBookingToCancel, 1);
		

		// Save the updated bookings
		existingRig.save(function(err, data) {
			if(err) {
				req.flash("error", err.message);
				return res.redirect("back");
			}

			Rig.findById(req.params.id)
			.populate("status.bookings.user")
			.exec(function(err, foundRig) {
				if(err) {
					req.flash("error", err.message);
					return res.redirect("/rigs/" + req.params.id);
				}

				res.json(foundRig.status.bookings);			
			});
		});






		// Delete all instances of the rig in approved users
		// foundRig.approvedUsers.forEach(function(user) {
		// 	var currentApproved = user.toJSON().approvedRigs;
		// 	user.approvedRigs = currentApproved.filter(e => !e.equals(foundRig._id));
		// 	user.save(function(err) {
		// 		if(err) {
		// 			req.flash("error", err.message);
		// 			return res.redirect("back");
		// 		}
		// 	});
		// });

		// // Delete the rig
		// foundRig.remove(function(err) {
		// 	if(err) {
		// 		req.flash("error", err.message);
		// 		return res.redirect("back");
		// 	}

		// 	req.flash("success", "Rig successfully deleted");
		// 	res.redirect("/rigs");
		// });
	});
});


module.exports = router;
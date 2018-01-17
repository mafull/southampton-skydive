var express = require("express");
var router = express.Router();

var Rig = require("../models/user");

// Index
router.get("/", function(req, res) {
	Rig.find({}, function(err, users) {
		if(!err) {
			res.render("users/index", {users: users});
		}		
	});	
});

// // New
// router.get("/new", isLoggedIn, function(req, res) {
// 	res.render("rigs/new");
// });

// // Create
// router.post("/", isLoggedIn, function(req, res) {
// 	var rig = {
// 		name: req.body.name,
// 		main: req.body.main,
// 		reserve: req.body.reserve
// 	};

// 	Rig.create(rig, function(err, rig) {
// 		if(!err) {
// 			res.redirect("/rigs");
// 		} else {
// 			console.log(err);
// 			res.redirect("/rigs");
// 		}
// 	});	
// });

// Show
router.get("/:id", function(req, res) {
	Rig.findById(req.params.id, function(err, foundUser) {
		if(!err) {
			res.render("users/show", {rig: foundUser});
		} else {
			// ALSO SEND ERROR MESSAGE
			res.redirect("/users");
		}
	});
	
});

// // Edit
// router.get("/:id/edit", isLoggedIn, function(req, res) {
// 	Rig.findById(req.params.id, function(err, foundRig) {
// 		if(!err) {
// 			res.render("rigs/edit", {rig: foundRig});
// 		} else {
// 			// ALSO SEND ERROR MESSAGE
// 			res.redirect("/rigs");
// 		}
// 	});
	
// });

// // Update
// router.put("/:id", isLoggedIn, function(req, res) {
// 	var rig = {
// 		name: req.body.name,
// 		main: req.body.main,
// 		reserve: req.body.reserve
// 	};

// 	Rig.findByIdAndUpdate(req.params.id, rig, function(err, updatedRig) {
// 		if(!err) {
// 			res.redirect("/rigs/" + req.params.id);
// 		} else {
// 			// ALSO SEND ERROR MESSAGE
// 			res.redirect("/rigs");
// 		}
// 	});	
// });

// // Destroy
// router.delete("/:id", isLoggedIn, function(req, res) {
// 	Rig.findByIdAndRemove(req.params.id, function(err) {
// 		if(!err) {
// 			res.redirect("/rigs");
// 		} else {
// 			// ALSO SEND ERROR MESSAGE
// 			res.redirect("/rigs");
// 		}
// 	});
// });

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;
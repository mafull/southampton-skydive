var express = require("express");
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
	Rig.findById(req.params.id).populate("approvedUsers").exec(function(err, foundRig) {
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

	Rig.findByIdAndUpdate(req.params.id, rig, function(err, updatedRig) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");
		}
		
		req.flash("success", "Rig successfully updated");
		res.redirect("/rigs/" + req.params.id);
	});	
});


// Destroy
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
	Rig.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			req.flash("error", err.message);
			return res.redirect("back");			
		}
		
		req.flash("success", "Rig successfully deleted");
		res.redirect("/rigs");
	});
});

module.exports = router;
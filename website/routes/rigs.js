var express = require("express");
var router = express.Router();

var middleware = require("../middleware");

var Rig = require("../models/rig");

// Rigs index
router.get("/", function(req, res) {
	Rig.find({}, function(err, rigs) {
		if(err) {
			return;
		}	

		res.render("rigs/index", {rigs: rigs});	
	});	
});

// Rigs new
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("rigs/new");
});

// Rigs create
router.post("/", middleware.isLoggedIn, function(req, res) {
	var rig = {
		name: req.body.name,
		main: req.body.main,
		reserve: req.body.reserve
	};

	Rig.create(rig, function(err, rig) {
		if(err) {
			console.log(err);
			return res.redirect("back");
		}

		res.redirect("/rigs");
	});	
});

// Rigs show
router.get("/:id", function(req, res) {
	Rig.findById(req.params.id, function(err, foundRig) {
		if(err) {
			// ALSO SEND ERROR MESSAGE
			return res.redirect("back");
		}

		res.render("rigs/show", {rig: foundRig});			
	});
	
});

// Rigs edit
router.get("/:id/edit", middleware.isLoggedIn, function(req, res) {
	Rig.findById(req.params.id, function(err, foundRig) {
		if(err) {
			// ALSO SEND ERROR MESSAGE
			return res.redirect("back");			
		}
			
		res.render("rigs/edit", {rig: foundRig});
	});
	
});

// Rigs update
router.put("/:id", middleware.isLoggedIn, function(req, res) {
	var rig = {
		name: req.body.name,
		main: req.body.main,
		reserve: req.body.reserve
	};

	Rig.findByIdAndUpdate(req.params.id, rig, function(err, updatedRig) {
		if(err) {
			// ALSO SEND ERROR MESSAGE
			return res.redirect("back");
		}
		
		res.redirect("/rigs/" + req.params.id);
	});	
});

// Rigs destroy
router.delete("/:id", middleware.isLoggedIn, function(req, res) {
	Rig.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			// ALSO SEND ERROR MESSAGE
			return res.redirect("back");			
		}
		
		res.redirect("/rigs");
	});
});

module.exports = router;
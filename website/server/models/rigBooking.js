var mongoose = require("mongoose");

var Rig = require("./rig");
var User = require("./user");

var rigBookingSchema = new mongoose.Schema({
	// General info
	created: {type: Date, default: Date.now},

	date: Date,
	rig: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Rig"
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	requirement: {type: String, default: ""},
	priority: {type: Number, default: -1}
});

module.exports = mongoose.model("RigBooking", rigBookingSchema);
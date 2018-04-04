var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

var CommitteePosition = require("./committeePosition");
var Rig = require("./rig");
var RigBooking = require("./rigBooking");

var userSchema = new mongoose.Schema({
	// General info
	username: String,
	password: String,
	email: String,
	forename: String,
	surname: String,
	created: {type: Date, default: Date.now},
	modified: {type: Date, default: Date.now},

	// Additional login options
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},

	// User level
	isAdmin: {type: Boolean, default: false},
	isCommittee: {type: Boolean, default: false},
	committeePosition: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CommitteePosition"
	},

	// Membership
	hasMembership: {type: Boolean, default: false},

	// Privileges
	canEditRigs: {type: Boolean, default: false},

	// Rigs that the user is approved to use
	approvedRigs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Rig"
		}
	],

	// Current active rig bookings
	rigBookings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RigBooking"
		}
	]

});
userSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", userSchema);

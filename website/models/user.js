var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

var Rig = require("./rig");

var userSchema = new mongoose.Schema({
	// General info
	username: String,
	password: String,
	email: String,
	forename: String,
	surname: String,
	created: {type: Date, default: Date.now},
	modified: {type: Date, default: Date.now},

	// User level
	isAdmin: {type: Boolean, default: false},
	isCommittee: {type: Boolean, default: false},

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
	]
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
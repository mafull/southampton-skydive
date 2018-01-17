var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	// Passport required
	username: String,
	password: String,

	// Additional info
	email: String,
	forename: String,
	surname: String,

	// User level
	isAdmin: {type: Boolean, default: false},
	isCommittee: {type: Boolean, default: false},

	// Membership
	hasMembership: {type: Boolean, default: false},

	// Privileges
	canEditRigs: {type: Boolean, default: false},

	// approvedRigs: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Rig"
	// 	}
	// ]
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
var mongoose 				= require("mongoose"),
	passportLocalMongoose 	= require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,

	email: String,

	forename: String,
	surname: String,


	// approvedRigs: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Rig"
	// 	}
	// ]
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
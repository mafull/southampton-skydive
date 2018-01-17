var mongoose = require("mongoose");

//var User = require("../models/user");

var rigSchema = new mongoose.Schema({
	name: String,

	created: {type: Date, default: Date.now},
	modified: {type: Date, default: Date.now},

	main: {
		make: {type: String, default: ""},
		model: {type: String, default: ""},
		size: {type: Number, default: 0}
	},
	reserve: {
		make: {type: String, default: ""},
		model: {type: String, default: ""},
		size: {type: Number, default: 0}
	},

	approvedUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	]
});

module.exports = mongoose.model("Rig", rigSchema);
var mongoose = require("mongoose");

var User = require("./user");

var committeePositionSchema = new mongoose.Schema({
	title: String,
	tier: Number,
	description: String,

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},

	created: {type: Date, default: Date.now},
	modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model("CommitteePosition", committeePositionSchema);
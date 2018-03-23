var mongoose = require("mongoose");

var User = require("./user");

var committeePositionSchema = new mongoose.Schema({
	// General info
	name: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	description: String,
	tier: Number,
	created: {type: Date, default: Date.now},
	modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model("CommitteePosition", committeePositionSchema);
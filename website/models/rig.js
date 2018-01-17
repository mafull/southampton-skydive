var mongoose = require("mongoose");

var rigSchema = new mongoose.Schema({
	name: String,
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
	created: {type: Date, default: Date.now},
	modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Rig", rigSchema);
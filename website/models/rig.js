var mongoose = require("mongoose");

var User = require("./user");

var rigSchema = new mongoose.Schema({
	// General info
	name: String,
	created: {type: Date, default: Date.now},
	modified: {type: Date, default: Date.now},

	// Equipment
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

	// Users that are allowed to use the rig
	approvedUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],

	// Booking info
	status: {
		isOnline: {type: Boolean, default: false},
		offlineNote: {type: String, default: ""},

		bookings: [
			{
				date: Date,
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
				},
				requirement: {type: String, default: ""},
				priority: {type: Number, default: 0}
			}
		]
	}
});

module.exports = mongoose.model("Rig", rigSchema);
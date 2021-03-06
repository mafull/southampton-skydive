import mongoose from "mongoose";

import {
	RigBooking,
	User
 } 				from ".";


const rigSchema = new mongoose.Schema({
	// General info
	name: String,
	created: {type: Date, default: Date.now},
	modified: {type: Date, default: Date.now},

	// Equipment
	equipment: {
		main: {
			make: {type: String, default: ""},
			model: {type: String, default: ""},
			size: {type: Number, default: 0}
		},
		reserve: {
			make: {type: String, default: ""},
			model: {type: String, default: ""},
			size: {type: Number, default: 0}
		}
	},

	// Users that are allowed to use the rig
	approvedUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],

	// General status
	isOnline: {type: Boolean, default: false},
	offlineNote: {type: String, default: ""},

	// Bookings
	bookings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RigBooking"
		}
	]
});


export default mongoose.model("Rig", rigSchema);

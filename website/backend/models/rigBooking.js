import mongoose from "mongoose";

import {
	Rig,
	User
}				from ".";


const rigBookingSchema = new mongoose.Schema({
	// General info
	created: {type: Date, default: Date.now},

	date: Date,
	rig: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Rig"
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	requirement: {type: String, default: ""},
	priority: {type: Number, default: -1}
});


export default mongoose.model("RigBooking", rigBookingSchema);

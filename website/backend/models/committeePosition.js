import mongoose from "mongoose";

import { User } from ".";


const committeePositionSchema = new mongoose.Schema({
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


export default mongoose.model("CommitteePosition", committeePositionSchema);

import express 		from "express";

import middleware 	from "../middleware";

import {
	User,
	Rig
} 					from "../models";

const router = express.Router();


// Index
router.get("/", (req, res) => {
	User
		.find({})
		.sort([
			["forename", 1],
			["surname", 1]
		])
		.exec((err, users) => {
			if(err) {
				return res.status(404).send("Unable to retrieve user data");
			}

			// Return user data
			res.json(users);
		});
});


// Show
router.get("/:id", (req, res) => {
	User
		.findById(req.params.id)
		.populate({
			path: "approvedRigs",
			options: {
				// Sort biggest to smallest, docile to sporty
				sort: {
					"main.size": -1,
					"name": 1
				}
			}
		})
		.exec((err, foundUser) => {
			if(err) {
				return res.status(404).send("Unable to retrieve user data");
			}

			// Return user data
			res.json(foundUser);
		});
});


export default router;

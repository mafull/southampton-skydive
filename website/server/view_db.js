var mongoose 				= require("mongoose");

var User = require("./models/user");

// Connect to the database
//var url = process.env.SKYDIVE_DATABASE_URL;
//mongoose.connect(url);
//mongoose.connect("mongodb://localhost/skydive_website");
mongoose.connect("mongodb://UoSAdmin:admin123@ds211588.mlab.com:11588/uos_skydive_website");

mongoose.connection.on("open", (ref) => {
	console.log("Connected to database");

	mongoose.connection.db.listCollections().toArray((err, names) => {
		if(err) {
			return console.log(err.message);
		}
		//console.log(names);
	});

	User.find({_id: null}, (err, users) => {
		console.log(users);

		users.forEach((user) => {
			// user.remove((err) => {
			// 	if(err) {
			// 		console.log(err.message);
			// 	}

			// 	console.log("Deleted");
			// });

			user._id = new mongoose.Types.ObjectId();
			user.save();
		});
	});
});
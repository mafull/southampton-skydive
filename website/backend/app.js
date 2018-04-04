import express 			from "express";
import bodyParser 		from "body-parser";
import mongoose 		from "mongoose";
import methodOverride 	from "method-override";

import routes 			from "./routes/index";


// Create an express application instance
const app = express();

// Connect to the database
//var url = process.env.SKYDIVE_DATABASE_URL;
//mongoose.connect(url);
//mongoose.connect("mongodb://localhost/skydive_website");
mongoose.connect("mongodb://UoSAdmin:admin123@ds211588.mlab.com:11588/uos_skydive_website");

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable method override
app.use(methodOverride("_method"));

// Declare routes
app.use("/api", routes);

// Listen for requests
app.listen(
	3001,
	"localhost",
	() => console.log(" -- Server started -- ")
);

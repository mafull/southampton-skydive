var express 				= require("express"),
	bodyParser 				= require("body-parser"),
	request 				= require("request"),
	mongoose 				= require("mongoose"),
	methodOverride 			= require("method-override");

// Require routes
var indexRoutes 	= require("./routes/index"),
	committeeRoutes = require("./routes/committee"),
	userRoutes		= require("./routes/users"),
	rigRoutes		= require("./routes/rigs");


// ----- App config ----- 
var app = express();

// Connect to the database
//var url = process.env.SKYDIVE_DATABASE_URL;
//mongoose.connect(url);
//mongoose.connect("mongodb://localhost/skydive_website");
mongoose.connect("mongodb://UoSAdmin:admin123@ds211588.mlab.com:11588/uos_skydive_website");

// Set up view engine and public directory
app.set("view engine", "ejs");
app.use(express.static("public"));

// Configure body parser and method override
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));


// ----- RESTful routes -----
app.use(indexRoutes);
app.use("/committee", committeeRoutes);
app.use("/users", userRoutes);
app.use("/rigs", rigRoutes);

app.get("*", function(req, res) {
	res.send("Page not found!");
});


// ----- Listen for requests -----
app.listen(3001, "localhost", function() {
	console.log(" -- Server started -- ");
});
var express 				= require("express"),
	expressSanitizer 		= require("express-sanitizer"),
	bodyParser 				= require("body-parser"),
	request 				= require("request"),
	mongoose 				= require("mongoose"),
	methodOverride 			= require("method-override"),
	passport				= require("passport"),
	LocalStrategy			= require("passport-local"),
	passportLocalMongoose 	= require("passport-local-mongoose");

// Require routes
var authRoutes 	= require("./routes/auth"),
	rigRoutes	= require("./routes/rigs");

// Require models
var Rig 	= require("./models/rig"),
	User 	= require("./models/user");

// ----- App config ----- 
mongoose.connect("mongodb://localhost/skydive_website");

var app = express();
app.set("view engine", "ejs");

// Passport config
app.use(require("express-session")({
	secret: "This secret is used for encoding and decoding",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

// ----- RESTful routes -----
app.use("/", authRoutes);
app.use("/rigs", rigRoutes);

// Index
app.get("/", function(req, res) {
	res.render("home");
});

// Weather
app.get("/weather", function(req, res) {
	var url = "https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22southampton%2C%20uk%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
	request(url, function(error, response, body) {
		var sunsetTime = "unknown";

		if(!error && response.statusCode == 200) {
			// Convert body (string) into JSON object
			var data = JSON.parse(body);
			sunsetTime = data["query"]["results"]["channel"]["astronomy"]["sunset"];
			
		} else {
			console.log("Something went wrong!");
			console.log(error);
		}

		res.render("weather", {sunsetTime: sunsetTime});
	});
})


app.get("*", function(req, res) {
	//res.send("Page not found!");
	res.render("home");
});


// ----- Listen for requests ----- 
app.listen(3000, "localhost", function() {
	console.log(" -- Server started -- ");
});
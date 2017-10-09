var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    // Comment     = require("./models/comment"),
    User  = require("./models/user"),
    Order = require("./models/order");

//requiring routes
var orderRoutes    = require("./routes/index");

console.log("DATABASEURL: ..." + process.env.DATABASEURL.substr(25,100));

var url = process.env.DATABASEURL || "mongodb://localhost/gastronomeal1";

mongoose.connect(url); //connect mongodb database (mlab/local mongod)
app.set('port', process.env.PORT || 2000); //set PORT
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash()); //flash message

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global variables
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

   next();
});


app.use("/", orderRoutes); //index route
require("./routes/upload.js")(app); //upload json route

// app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(app.get('port'), function(err){
    var d = new Date();
    var n = d.toLocaleTimeString();
    console.log("Port: " + app.get('port') + ", GM Server Has Started! Time: " + n);
});

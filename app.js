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

    
var url = process.env.DATABASEURL || "mongodb://localhost/gastronomeal1"

console.log(url.substr(30,100));

mongoose.connect(url);

app.set('port', process.env.PORT || 2000);
// app.set('port',  2000);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

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

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

   next();
});


// app.use("/", indexRoutes);
// app.use("/campgrounds", campgroundRoutes);
require("./routes/upload.js")(app);
app.use("/", orderRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);



// app.listen(process.env.PORT, process.env.IP, function(err){
app.listen(app.get('port'), function(err){
    var d = new Date();
    var n = d.toLocaleTimeString();
        console.log("Port: " + app.get('port') + ", The GMeal Server Has Started! Time: " + n);
        

});

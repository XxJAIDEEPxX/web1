var exp                 =require("express");
var app                 =exp();
var mongoose            =require("mongoose"),
    passport            =require("passport"),
    LocalStrategy       =require("passport-local");
var x                   =require("request");
var parse               =require("body-parser"),
    Campground          =require("./models/campground.js"),
    Comment             =require("./models/comment.js"),
    User                =require("./models/user.js"),
    seed                =require("./seeds.js");
    
    
var CampgroundRoutes    =require("./routes/campground.js"),
    CommentRoutes       =require("./routes/comment.js"),
    AuthenticationRoutes=require("./routes/index.js");
    
    
seed();    
//////////////////////////////////////////////


mongoose.connect("mongodb://localhost/yelp_v3");

app.use(parse.urlencoded({extended : true}));
app.use(exp.static("public"));
app.set('view engine','ejs');

app.use(require("express-session")({
    secret: "Finally transformers released",
    resave: false,
    saveUninitialized: false
}));
 app.use(passport.initialize());
   app.use(passport.session());
   passport.use(new LocalStrategy(User.authenticate()));
   passport.serializeUser(User.serializeUser());
   passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    next();
});

app.use(CommentRoutes);
app.use(CampgroundRoutes);
app.use(AuthenticationRoutes);











////////////////////////////////////////

app.get("*",function(req,res){
    res.send("ENTERING RESTRICTED DOMAIN ----- ERROR 404");
});
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server running viola!!!!!!!");
});

/////////////////////////////////////////
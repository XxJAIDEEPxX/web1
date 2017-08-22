var express             =require("express"),
    router              =express.Router(),
    Campground          =require("../models/campground.js"),
    Comment             =require("../models/comment.js"),
    User                =require("../models/user.js"),
    passport            =require("passport");
    
router.get("/",function(req,res){
    res.render("landing.ejs");
});



/////////////AUTHENTICATION ROUTES///////////////////
 router.get("/register",function(req,res){
    res.render("register.ejs");
 });
 
 router.get("/logout",function(req,res){
     req.logout();
     res.redirect("/camp");
 });

 router.post("/register",function(req,res){
       User.register(new User({username: req.body.username}),req.body.password,function(err,user){
           if(err)
           {
               console.log(err);
               res.redirect("/register");
           }
           passport.authenticate("local")(req,res,function(){
               res.redirect("/camp");
           });
       });
   });
   
   router.get("/login",function(req,res){
        res.render("login.ejs");
   });
   
    router.post("/login",passport.authenticate("local",{
       
       successRedirect: "/camp",
       failureRedirect: "/login"
   }),function(req,res){
       
   });
   
   function isloggedin(req,res,next){
    if(req.isAuthenticated())
    return next();
    res.redirect("/login");
}
module.exports  =  router;
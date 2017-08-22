var express             =require("express"),
    router              =express.Router(),
    Campground          =require("../models/campground.js"),
    Comment             =require("../models/comment.js");

///////////////////CAMP////////////////
router.get("/camp",function(req,res){
    console.log(req.user);
    Campground.find({},function(x,y){
        if(x)
        console.log("err"+x);
        else
        {
            res.render("campground/camping.ejs",{camp : y, currentUser: req.user});
        }
    });
    
    // res.render("camping.ejs",{camp : camp});
});



router.post("/camp",function(req,res){
    var name=req.body.name;
    var img=req.body.url;
    var def=req.body.define;
    var x={name : name , src : img, define:def};
    Campground.create(x,function(p,y){
        if(p)
        {
            console.log("err "+p);
        }
        else
        {
            console.log(y);
        }
    });
    res.redirect("/camp");
});

router.get("/camp/new",function(req,res){
    res.render("campground/newsite.ejs");
});

router.get("/camp/:show",function(req,res){
    
    Campground.findById(req.params.show).populate("comments").exec(function(err,foundG){
        if(err)
        console.log("err"+err);
        else
        {
            console.log(foundG);
            res.render("campground/description.ejs",{camp: foundG});
        }
    });
});
 function isloggedin(req,res,next){
    if(req.isAuthenticated())
    return next();
    res.redirect("/login");
}
module.exports  =  router;
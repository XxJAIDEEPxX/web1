
var express             =require("express"),
    router              =express.Router(),
    Campground          =require("../models/campground.js"),
    Comment             =require("../models/comment.js");

router.get("/camp/:show/comments/new",isloggedin,function(req,res){
    Campground.findById(req.params.show,function(err,done){
        if(err)
        console.log(err);
        else
            res.render("comment/new.ejs",{camp:done});
    });
});

router.post("/camp/:show/comments",isloggedin,function(req,res){
    Campground.findById(req.params.show,function(err,found){
        if(err)
        console.log(err)
        else
        {
            Comment.create(req.body.comment,function(err,comment){
                if(err)
                console.log(err);
                else
                {
                    console.log("Changes will be made to this user" + req.user.username);
                    found.comments.push(comment);
                    found.save();
                    res.redirect("/camp/"+found._id);
                }
            });
        }
    });
});
 function isloggedin(req,res,next){
    if(req.isAuthenticated())
    return next();
    res.redirect("/login");
}
module.exports  =  router;
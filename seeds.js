var mongoose=require("mongoose");
var Comment=require("./models/comment.js");
var Campground=require("./models/campground.js");


var camps=[{
            name: "Ground Shake",
            src: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg"
            },{
                name: "Grassy Savannah",
                src: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"
                },{
                name: "Dunes",
                src: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
                    }];
                    
function seed(){
    Campground.remove({},function(err){
        if(err)
        {
            console.log(err);
        }
        console.log("removed");
        camps.forEach(function(put){
            Campground.create(put,function(err,done){
                if(err)
                {
                    console.log(err);
                }
                    console.log("added");
                    Comment.create({
                        author: "Optimus Prime",
                        text: "Hi i will Destroy that camp!!"
                    },function(err,comment){
                        if(err)
                        console.log(err);
                        else
                        {
                            done.comments.push(comment);
                            done.save();
                            console.log("created comment");
                        }
                    });
            });
        });
    });
}

module.exports= seed;
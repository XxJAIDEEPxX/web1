var mongoose=require("mongoose");

var ground = new mongoose.Schema({
    name: String,
    src: String,
    define:String,
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Comment'
      }
   ]
});

module.exports = mongoose.model("Campground", ground);
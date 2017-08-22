var mongoose=require("mongoose");

var CSchema=new mongoose.Schema({
    author: String,
    text: String
});

module.exports=mongoose.model("Comment",CSchema);
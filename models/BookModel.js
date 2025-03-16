//declare mongoose
const mongoose = require('mongoose')

//declare collection (table) schema
//Note: schema === structure === design
const BookSchema = mongoose.Schema(
   {
      title: String,
      author: String,
      price: Number,
      //validate data
      quantity: {
         type: Number,
         min: 1,
         max: 500
      },
      image: String
   }
)

//declare BookModel
//"books" is collection name
const BookModel = mongoose.model("toy", BookSchema);

//export model
module.exports = BookModel
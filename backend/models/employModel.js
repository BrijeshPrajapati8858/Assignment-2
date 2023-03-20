const mongoose = require("mongoose");
const validator = require("validator");



const userSchema = mongoose.Schema({
  emp_id:{
    type:String,
    required:true,
    unique:true


  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minLength: [3, "please enter at  least 3 characters"],
    maxLength: [18, "Name cant bigger than 18 characters"],
  },

  age: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["remote", "contract", "full-time"],
  },
  location:{
    type:String,
    required:true,
  },
  longitude:{
    type:String,
    required:true,
  },
    latitude:{
    type:String,
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});



module.exports = mongoose.model("User", userSchema);
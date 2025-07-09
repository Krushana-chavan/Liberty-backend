const mongoose = require("mongoose");
const AuthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
   
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    role:{
      type:String,
      default:'user',
      
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
  },
  { timestamps: true }
);

const AuthModel = mongoose.model("user", AuthSchema);

module.exports = {
  AuthModel,
};

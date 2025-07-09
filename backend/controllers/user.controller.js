const { AuthModel } = require("../models/auth.model");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await AuthModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const getalluser = async (req, res) => {
  try {
    const users = await AuthModel.find({ role: { $ne: "admin" } }); // exclude admins
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error" }); // handle error properly
  }
};

const adduser = async (req,res)=>{
  const {username,email,password,phonenumber} = req.body;
 const isUser = await AuthModel.findOne({email})
 if(isUser){
  res.status(500).json({error:"User already exist !"})
 }else{
  try{
    const newUser = new AuthModel({
      username,
      email,
      password,
      phonenumber,
    });
    await newUser.save()
    res.status(200).json({msg:"User Added Successfully !"})
  }
  catch{
    res.status(400).json({msg:"Something went wrong !"})
  }
 }
 
}


const deleteuser =async (req,res)=>{
  try{
    const{id}= req.params;
    const delted = await AuthModel.findOneAndDelete({_id:id})
    if(delted){
      res.status(200).json({msg:"User Deleted Successfully !"})
    }
  }catch(err){
    res.status(400).json({msg:"Something went wrong ! Please try again!"})
  }
}
const UserController = {
  getUser,
  getalluser,
  adduser,
  deleteuser
};

module.exports = {
  UserController,
};

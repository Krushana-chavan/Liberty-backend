const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AuthModel } = require("../models/auth.model");

const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
console.log(name,email,password)
  const isUser = await AuthModel.findOne({ email });
  if (isUser) {
    res.status(500).json({ error: "User Already exist" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res
          .status(500)
          .json({ error: "Something went wrong try after sometime" });
      }
      const newUser = new AuthModel({
        name,
        email,
        password: hash,
      });

      try {
        const savedUser = await newUser.save();
        res.status(201).json({ msg: "Signup Sucessfully" });
      } catch (err) {
        res
          .status(500)
          .json({ error: "someting went wrong,please try again !" });
      }
    });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthModel.findOne({ email });

  if (user) {
    const hashed_pass = user.password;
    const user_id = user._id;
    const username = user.username;
    bcrypt.compare(password, hashed_pass, function (err, result) {
      if (err) {
        res
          .status(400)
          .json({ error: "Something went wrong try after sometime" });
      }
      if (result) {
        const token = jwt.sign(
          { user_id: user_id, email: email, username: username },
          process.env.SECRET_KEY,{
            expiresIn:"2 hours"
          }
        );
        const refreshtoken = jwt.sign(
          { },
          process.env.REFRESH_KEY,{
            expiresIn:"28 days"
          }
        );
        delete user.password;
        res.status(200).json({ msg: "Login Succesfull!", token,refreshtoken,user});
      } else {
        res.status(401).json({ error: "Check details once and try again!" });
      }
    });
  } else {
    res.status(400).json({ error: "User does not exist. " });
  }
};

const AuthController = {
  Login,
  SignUp,
};
module.exports = {
  AuthController,
};

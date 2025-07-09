const jwt = require("jsonwebtoken");
require("dotenv").config();
const Authentication = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  console.log(token);
  if (!token) {
    res.status(401).send({ msg: "please login" });
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const { user_id, email } = decoded;
  if (decoded) {
    req.body.user_id = user_id;
    next();
  } else {
    res.status(401).send({ msg: "please check details once and try again!" });
  }
};

module.exports = {
  Authentication,
};

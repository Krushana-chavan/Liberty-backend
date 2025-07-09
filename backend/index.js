const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
// const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
// const { fileURLToPath } = require("url");
const { connection } = require("./config/db");
const { AuthRouter } = require("./Routes/auth.route");
const { Userrouter } = require("./Routes/user.route");
const { PlotRouter } = require("./Routes/plot.route");
const { PoleRouter } = require("./Routes/pole.route");
const { TaskRouter } = require("./Routes/task.route");

const PORT = process.env.PORT || 5000;

/* CONFIGURATIONS */
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/auth", AuthRouter);
app.use("/task", TaskRouter);
app.use("/user", Userrouter);
app.use('/plot',PlotRouter)
app.use('/pole',PoleRouter)

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected Succesfull to db");
  } catch (err) {
    console.log("error from db");
    console.log(err);
  }
  console.log(`listing on port ${PORT}`);
});

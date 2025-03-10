const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
const mongostring = process.env.DATABASE_URL;
mongoose.connect(mongostring);
const database = mongoose.connection;
console.log(mongostring);

app.get("/", (req, res) => {
  res.send("hellow fellow");
});

try {
  database.on("error", (error) => {
    console.log("error in connection", error);
  });

  database.once("connected", () => {
    console.log("database connected");
  });
} catch (error) {
  console.log("error in database connection", error);
}

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.options("*", cors());

app.use(cookieParser());

const authRoutes = require("./routes/auth");
app.use("/admin", authRoutes);

const user_controller = require("./controllers/user_controller");
app.use("/user", user_controller);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

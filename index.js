const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookies = require("cookie-parser");
const port = 5000;
const app = express();
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

const allowedOrigins = [
  "http://localhost:5173", // ✅ Dev (Localhost)
  "https://your-frontend-url.vercel.app" // ✅ Prod (Vercel)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // ✅ Allow only defined origins
      } else {
        callback(new Error("Not allowed by CORS")); // ❌ Block other origins
      }
    },
    credentials: true, // ✅ Allow cookies & authentication
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // ✅ Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // ✅ Allowed headers
  })
);

app.use(cookies());

const authRoutes = require("./routes/auth");
app.use("/admin", authRoutes);

const user_controller = require("./controllers/user_controller");
app.use("/user", user_controller);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

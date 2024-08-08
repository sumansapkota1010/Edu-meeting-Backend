const express = require("express");
const { default: mongoose } = require("mongoose");
const { databaseConnection } = require("./database/database");

const { registerUser, loginUser } = require("./controller/auth/authController");

require("dotenv").config();

const authRoute = require("./routes/auth/authRoute");
const meetingRoute = require("./routes/meetingRoute/meetingRoute");
const courseRoute = require("./routes/courseRoute/courseRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongoose connection

databaseConnection(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Chaleko xa",
  });
});

//ROutes
app.use("/api", authRoute);
app.use("/api", meetingRoute);
app.use("/api", courseRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}`);
});

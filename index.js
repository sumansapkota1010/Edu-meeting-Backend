const express = require("express");
const { default: mongoose } = require("mongoose");
const { databaseConnection } = require("./database/database");
const cors = require("cors");

const { registerUser, loginUser } = require("./controller/auth/authController");

//Tell node to use dotenv
require("dotenv").config();

const authRoute = require("./routes/auth/authRoute");
const meetingRoute = require("./routes/meetingRoute/meetingRoute");
const courseRoute = require("./routes/courseRoute/courseRoute");
const contactRoute = require("./routes/contact/contactRoute");
const userProfileRoute = require("./routes/profileRoute");
const categoryMeeting = require("./routes/meetingRoute/meetingRoute");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//telling nodejs to give access to uploads folder
app.use(express.static("uploads"));

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
app.use("/api", contactRoute);
app.use("/api", userProfileRoute);
app.use("/api", categoryMeeting);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}`);
});

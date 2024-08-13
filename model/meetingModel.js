const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
    hours: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bookNow: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["All Meetings", "Soon", "Important", "Attractive"],
      required: true,
    },
    meetingImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;

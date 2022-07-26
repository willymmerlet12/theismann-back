const mongoose = require("mongoose");

const Podcast = mongoose.model("Podcast", {
  podcast_title: String,
  guest_name: String,
  podcast_date: String,
  podcast_length: String,
  podcast_description: String,
  podcast_file: String,
});

module.exports = Podcast;

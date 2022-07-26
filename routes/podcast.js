const express = require("express");
const router = express.Router();

const Podcast = require("../models/Podcast");

router.post("/post", async (req, res) => {
  try {
    const { name, title, length, date, description } = req.fields;

    const newPodcast = new Podcast({
      guest_name: name,
      podcast_title: title,
      podcast_date: date,
      podcast_length: length,
      podcast_description: description,
    });

    console.log(newPodcast);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

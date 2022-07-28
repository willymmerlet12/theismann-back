require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const cors = require("cors");
const formidable = require("express-formidable");
const errorHandler = require("errorhandler");
var bodyParser = require("body-parser");

const mongoose = require("mongoose");

const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

const Podcast = require("./models/Podcast");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI);

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

const uploadAudio = (filename, bucketname, file) => {
  return new Promise((resolve, reject) => {
    const params = {
      Key: filename,
      Bucket: bucketname,
      Body: file,
      ContentType: "audio/mpeg",
      ACL: "public-read",
    };
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

app.post("/upload", upload.single("audiofile"), async (req, res) => {
  try {
    // audio file
    const filename = "My fist uplonqnsad";
    const bucketname = "theismbuck";
    const file = req.file.buffer;
    console.log(file);
    const link = await uploadAudio(filename, bucketname, file);
    console.log(link);
    res.send("successss");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/post", async (req, res) => {
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
    await newPodcast.save();
    res.json(newPodcast);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: error.message });
});

app.listen(PORT, () => {
  console.log("Server started");
});

require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

const multer = require("multer");
const { memoryStorage } = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });

const PORT = process.env.PORT || 8080;
const app = express();

mongoose.connect(process.env.MONGODB_URI);

const s3 = new AWS.S3({
  accessKeyId: "AKIA6HNVHSCQROUZUDKT",
  secretAccessKey: "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",
});

const uploadAudio = (filename, bucketname, file) => {
  const params = {
    Key: filename,
    Bucket: bucketname,
    Body: file,
    ContentType: ";audio/mpeg",
    ACL: "public-read",
  };
  s3.upload(params, (err, data) => {
    if (err) {
      return err;
    } else {
      return data;
    }
  });
};

app.post("/upload", upload.single("audiofile"), (req, res) => {
  const filename = "My fist upload";
  const bucketname = "theismbuck";
  const file = req.file.buffer;
  console.log(file);
  const link = uploadAudio(filename, bucketname, file);
  console.log(link);
  res.send("uploaded successfully");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: error.message });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started");
});

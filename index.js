require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(formidable({ multiples: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.all("*", (req, res) => {
  res.status(404).json({ message: error.message });
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server started");
});

const express = require("express");
const router = express.Router();

const Podcast = require("../models/Podcast");

router.post("/post", async (req, res) => {
     try {
        const {
            name, 
            title,
            length,
            date,
            description,
        } = req.fields
     }
});

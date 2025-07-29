const Song= require('../../db/models/song.model');
const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/storage.service");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const uploadFields = upload.fields([
  { name: "audio", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

router.post("/songs", uploadFields, async (req, res) => {
  try {
    const { title, artist, mood } = req.body;
    const audioFile = req.files.audio?.[0];
    const imageFile = req.files.image?.[0];
console.log(req.body)

    if (!audioFile || !imageFile) {
      return res.status(400).json({ error: "Audio and image are required." });
    }

    const [audioRes, imageRes] = await Promise.all([
      uploadFile(audioFile),
      uploadFile(imageFile),
    ]);
        console.log(audioRes, imageRes)
    const newSong = await Song.create({
      title,
      artist,
      mood,
      audio: audioRes.url,
      image: imageRes.url,
    });

    res.status(200).json({
      message: "Files uploaded successfully!",
      data: {
        title,
        artist,
        mood,
        audioUrl: audioRes.url,
        imageUrl: imageRes.url,
      },
    });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: "Upload failed." });
  }
});

router.get('/songs', async (req, res) => {
    const {mood} = req.query;
    const songs = await Song.find({ mood :mood})

    res.status(200).json({
        message: 'Songs fetched successfully',
        songs
    });
});


module.exports = router;

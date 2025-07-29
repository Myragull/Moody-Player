const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  mood: String,
  audio: String,
  image: String,
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;

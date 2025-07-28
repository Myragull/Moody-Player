const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });


router.post('/songs',upload.single('file'),  (req, res) => {
const song = req.body;
const file = req.file;
console.log(req.body);
console.log(req.file);

res.status(201).json({ 
    message: 'Song created successfully', 
    song: song 
});

});

module.exports = router;
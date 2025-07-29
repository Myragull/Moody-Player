const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });
const uploadFields = upload.fields([
    {name:'audio'},
    {name:'image'}
])

router.post('/songs',uploadFields,  (req, res) => {
    const formData = req.body;
    const files = req.files;
    console.log(formData);
    console.log(files);

res.status(201).json({ 
    message: 'Song created successfully', 
    data:formData
});

});

module.exports = router;
const express = require('express');
const imageUpload = require('../Controlers/Uploads/imageUploads')
const router = express.Router();

router.post('/', imageUpload.imageUpload);
module.exports = router;

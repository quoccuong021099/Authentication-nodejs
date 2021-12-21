const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

let upload = multer({
  storage: storage,
  filename: function (req, file, cb) {
    if (file.mimeType === 'image/png' || file.mimeType === 'image/jpg') {
      cb(null, true);
    } else {
      console.log('Only jpg & png  file supported!');
      cb(null, false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 2 },
});

module.exports = upload;

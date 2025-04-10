const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

// uploads directory 
const uploadPath = path.join(__dirname, '../public/images/uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, buffer) {
      if (err) return cb(err);
      const uniqueName = buffer.toString('hex') + path.extname(file.originalname);
      cb(null, uniqueName);
    });
  }
});

const upload = multer({
  storage: storage,
  // Optional: file type validation
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only images are allowed (jpg, png, gif)'));
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;

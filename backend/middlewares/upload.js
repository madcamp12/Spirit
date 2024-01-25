const multer = require('multer');

exports.uploads = multer({
    dest: 'images/',
});
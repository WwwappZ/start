const multer = require('multer')
var path = require('path');
const config = require('../config');
const uuidv4 = require('uuid/v4');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {   
    cb(null, config.PROJECT_DIR + '/dest/')
  },
  filename: function(req, file, cb) {
    const randomPart = uuidv4(); // use whatever random you want.
    const extension = file.mimetype.split('/')[1];    
    cb(null, randomPart + `.${extension}`)

  }
});
var upload = multer({storage: storage}).single('file');
module.exports = upload;

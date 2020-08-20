const multer = require("multer");
const uploadConfig = require('../config/upload.config')

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,uploadConfig.projectDir + "client/src/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.replace(/ /g,"")
    cb(null, `Emage-${filename}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;


const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey : "RyE9RQ+IpwFDBkfYUrujgkxCzHUd9RZ0lxR4YcFM",
    accessKeyId : "AKIAJA5KSDIBKHJQR4KQ",
    region : "ap-south-1"
})
const s3 = new aws.S3({ 
    
})
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'tumkurhomes',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: "testfile1"});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;
 

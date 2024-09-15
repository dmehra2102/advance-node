const keys = require("../config/keys");
const AWS = require("aws-sdk");
const requireLogin = require("../middlewares/requireLogin");
const uuid = require("uuid");

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: "ap-south-1",
});

module.exports = (app) => {
  app.get("/api/upload", requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    const response = s3.getSignedUrl(
      "putObject",
      {
        Bucket: keys.s3BucketName,
        ContentType: "image/jpeg",
        Key: key,
      },
      (err, url) => res.send({ key, url })
    );
  });
};

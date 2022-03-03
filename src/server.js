const express = require("express");
const { get } = require("http");
const multer = require("multer");
const { stringify } = require("querystring");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const app = express();
const PORT = process.env.PORT || 3001;
const server = require("http").createServer(app);
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.listen(PORT, () => {
  console.log(`🌎  ==> Server now listening on PORT: ${PORT} `);
});

app.post("/", upload.single("image"), async (req, res) => {
  // setTimeout(async () => {
  await unlinkFile(req.file.path);
  // }, 5000);
});

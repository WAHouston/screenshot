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
const nodemailer = require("nodemailer");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "wandrewhouston@gmail.com",
    pass: ""//Password
  },
});

server.listen(PORT, () => {
  console.log(`🌎  ==> Server now listening on PORT: ${PORT} `);
});

app.post("/", upload.single("image"), async (req, res) => {
  let filename = req.file.filename;
  var mailOptions = {
    from: "wandrewhouston@gmail.com",
    to: "Will.H@altusjobs.com",
    subject: "Test Email",
    text: "Look at you, you magnificent genius! You did it! Look at that png. YOU did that!",
    attachments: [
      {
        filename: "TestName.png",
        path: path.join(__dirname, `/uploads/${filename}`)
      },
    ],
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log("Message sent: " + info.response);
  });
  setTimeout(async () => {
    await unlinkFile(req.file.path);
  }, 5000);
});
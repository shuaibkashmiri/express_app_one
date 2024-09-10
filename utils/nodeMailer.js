const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "advicetechkmr@gmail.com",
    pass: "cpov svhp wunw ibtw",
  },
});



module.exports = transporter
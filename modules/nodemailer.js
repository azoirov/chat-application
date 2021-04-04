const nodemailer = require("nodemailer");

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASS;

module.exports = {
  sendEmail: (userEmail, verificationLink) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    let mailOptions = {
      from: EMAIL,
      to: userEmail,
      subject: "Email Verification",
      html: `<a href="localhost/confirm/${verificationLink}">Verify your account</a>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
      }
    });
  },
};

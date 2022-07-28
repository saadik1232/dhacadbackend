var nodemailer = require("nodemailer");

module.exports.sendEmail = (to, sub, msg, cb = null) => {
  var transporter = nodemailer.createTransport({
    host: "lin1.byte90.com",
    port: 465,
    secure: true,
    auth: {
      user: "tech@simolution.com.pk",
      pass: "J00gle@987",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  var mailOptions = {
    from: '"Node Mailer Contact" <tech@simolution.com.pk>',
    to: to,
    subject: sub,
    text: msg,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      if (cb != null) {
        cb();
      }
    }
  });
};

module.exports.sendEmailWithHtml = (to, sub, msg, cb = null) => {
  var transporter = nodemailer.createTransport({
    host: "lin1.byte90.com",
    port: 465,
    secure: true,
    auth: {
      user: "tech@simolution.com.pk",
      pass: "J00gle@987",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  var mailOptions = {
    from: '"Node Mailer Contact" <tech@simolution.com.pk>',
    to: to,
    subject: sub,
    text: "",
    html: msg,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      if (cb != null) {
        cb();
      }
    }
  });
};

// const geolib = require("geolib");

// var data = geolib.isPointWithinRadius(
//   { latitude: 51.525, longitude: 7.4575 },
//   { latitude: 51.5175, longitude: 7.4678 },
//   1100
// );

// console.log("Data: ", data);

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zaeemtarrar3@gmail.com",
    pass: "Programmer123#",
  },
});

var mailOptions = {
  from: "zaeemtarrar3@gmail.com",
  to: "blitzbhatti@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

if (opr && opr.length > 0) {
  oprId = opr[0].id;
  req.body.operatorInvolved = oprId;
  // console.log(green("Operator ID: " + oprId));
  // console.log(green("Customer ID: " + user.id));
  var created = await Panic.create({ ...req.body });
  // res.json(RES(200, "Panic Creation Success", created));
  // exit;
  if (created) {
    ind(
      user.fcmToken,
      "Alert Request has reached Security Office",
      "Help on the Way.",
      {
        // firstname: responder.firstname,
        // lastname: responder.lastname,
        // deviceId: JSON.stringify(responder.deviceId),
        // KeyIntent: "Responder Assigned by System",
      },
      (detail) => {
        console.log("Done !");
      }
    );
    await addLogs(
      "Alert Request has reached Security Office Operator",
      "Help on the Way.",
      oprId,
      opr[0].firstname,
      user.id,
      user.firstname,
      {}
    );
    // logs("Panic", "New Panic Created", { ...req.body }, id);
    await addPanicLogs(
      created.id,
      0,
      oprId,
      0,
      user.groupId,
      "New Panic Created"
    );
    res.json(RES(200, "Panic Creation Success", created));
  } else res.json(RES(403, "Panic Creation Failed"));
} else {
  res.json(RES(200, "Success"));
  if (spr && spr.length > 0) {
    oprId = spr[0].id;
    req.body.supervisorInvolved = oprId;
    var created = await Panic.create({ ...req.body });
    if (created) {
      ind(
        user.fcmToken,
        "Alert Request has reached Security Office",
        "Help on the Way.",
        {
          // firstname: responder.firstname,
          // lastname: responder.lastname,
          // deviceId: JSON.stringify(responder.deviceId),
          // KeyIntent: "Responder Assigned by System",
        },
        (detail) => {
          console.log("Done !");
        }
      );
      addLogs(
        "Alert Request has reached Security Office Operator",
        "Help on the Way.",
        oprId,
        spr[0].firstname,
        user.id,
        user.firstname,
        {}
      );
      // res.json(RES(200, "Sucess"));
      res.json(RES(200, "Panic Creation Success", created));
      await addPanicLogs(
        created.id,
        0,
        oprId,
        0,
        user.groupId,
        "New Panic Created"
      );
    } else res.json(RES(403, "Panic Creation Failed"));
  } else {
    res.json(RES(403, "No Operator or Supervisor is Available !"));
  }
}

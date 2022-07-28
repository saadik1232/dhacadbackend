var admin = require("firebase-admin");
var serviceAccount = require("./panic-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://panic-alarm-system-f791b.firebaseio.com",
});
const FirebaseMsg = (topic, title, body) => {
  var registrationToken = null;
  var payload = {
    notification: {
      title: title,
      body: body,
    },
    data: {},
  };
  var options = {
    priority: "normal",
    timeToLive: 60 * 60,
  };
  admin
    .messaging()
    .sendToTopic(topic, payload)
    .then(function (response) {
      console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
      console.log("Error sending message:", error);
    });
};

// const PrivateMessage = (title, message, icon, image, FCM) => {
//   var registrationToken = FCM;
//   var message = {
//     data: {
//       Title: title,
//       Message: message,
//       Icon: icon,
//       Image: image,
//     },
//     token: registrationToken,
//   };
//   var options = {
//     priority: "normal",
//     timeToLive: 60 * 60,
//   };
//   admin
//     .messaging()
//     .send(message)
//     .then((response) => {
//       console.log("Successfully sent message:", response);
//     })
//     .catch((error) => {
//       console.log("Error sending message:", error);
//     });
// };

const AuthenticateUserId = async (uid, cb = null) => {
  await admin
    .auth()
    .getUser(uid)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      // res.json(RES(200, "Test Data", userRecord));
      cb(userRecord);
    })
    .catch(function (error) {
      // res.json(RES(200, "Test Data", error));
    });
};

module.exports.fire = FirebaseMsg;
module.exports.auth = AuthenticateUserId;
module.exports.PrivateMessage = PrivateMessage;

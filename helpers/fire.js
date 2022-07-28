var admin = require("firebase-admin");
var serviceAccount = require("../panic-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://panic-alarm-system-f791b.firebaseio.com",
});
const FirebaseMsg = (topic, title, body, DATA = {}) => {
  var registrationToken = null;
  var payload = {
    notification: {
      title: title,
      body: body,
    },
    data: DATA,
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
//my own
const FirebaseMsgTopic = (
  title,
  body,
  topic,
  image_name,
  active,
  priority,
  key,
  notificationtype,
  DATA = {}
) => {
  DATA = {
    heading: title,
    Message: body,
    topic: topic,
    image_name: image_name,
    active: active,
    priority: priority,
    key: key,
    notificationtype: notificationtype,
  };

  var payload = {
    data: DATA,
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

const PrivateMessage = (
  title,
  message,
  FCM,
  imagepath,
  key,
  notificationtype,
  DATA = {}
) => {
  var registrationToken = FCM;
  DATA = {
    heading: title,
    Message: message,
    image_name: imagepath,
    key: key,
    notificationtype: notificationtype,
  };
  var payload = {
    data: DATA,
    token: registrationToken,
  };
  admin
    .messaging()
    .send(payload)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

const silentNotificationtopic = (key, notificationType, topic, DATA = {}) => {
  DATA = {
    key: key,
    notificationType: notificationType,
  };
  var payload = {
    data: DATA,
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

const silentNotificationFCM = (key, notificationType, FCM, DATA = {}) => {
  var registrationToken = FCM;
  DATA = {
    key: key,
    notificationType: notificationType,
  };
  var payload = {
    data: DATA,
    token: registrationToken,
  };
  admin
    .messaging()
    .send(payload)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};

const indMsg = async (token, info, cb = null) => {
  // This registration token comes from the client FCM SDKs.
  // var registrationToken = 'YOUR_REGISTRATION_TOKEN';

  var message = {
    data: {
      ...info,
    },
    token: token,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  await admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      // console.log('Successfully sent message:', response);
      cb(response);
    })
    .catch((error) => {
      cb(error);
    });
};
module.exports.PMessage = PrivateMessage;
module.exports.TopicNotification = FirebaseMsgTopic;
module.exports.silentNotificationtopic = silentNotificationtopic;
module.exports.silentNotificationFCM = silentNotificationFCM;
module.exports.fire = FirebaseMsg;
module.exports.auth = AuthenticateUserId;
module.exports.ind = async (token, title, msg, info, cb = null) => {
  var registrationToken = token;
  var payload = {
    notification: {
      title: title,
      body: msg,
    },
    data: {
      ...info,
      title: title,
      body: msg,
      // KeyIntent: "Responder Assigned by System",
    },
  };
  var options = {
    priority: "normal",
    timeToLive: 60 * 60,
  };
  try {
    await admin
      .messaging()
      .sendToDevice(registrationToken, payload, options)
      .then(function (response) {
        console.log("Successfully sent message:", response);
        cb(response);
      })
      .catch(function (error) {
        console.log("Error sending message:", error);
        cb(error);
      });
  } catch (e) {
    console.log("Error: ", e);
  }
};

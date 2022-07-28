var twilio = require("twilio");

module.exports.twilioMessage = async (to, body, cb = null) => {
  var accountSid = "AC3164788fff6b1fc268237a61e9f638fd"; // Your Account SID from www.twilio.com/console
  var authToken = "3cd1bf5ef607d36d9a83027a99196b5d"; // Your Auth Token from www.twilio.com/console

  var client = new twilio(accountSid, authToken);
  try {
    await client.messages
      .create({
        body: body,
        to: to, // Text this number
        from: "+19362052967", // From a valid Twilio number
      })
      .then(function (response, message) {
        console.log("Successfully sent message:", response);
        // console.log("Message SID :", message.sid);
        if (cb != null) {
          cb(response);
        }
      })
      .catch(function (error) {
        console.log("Error sending message:", error);
        if (cd != null) {
          cb(error);
        }
      });
  } catch (e) {
    console.log("Error: ", e);
  }
};

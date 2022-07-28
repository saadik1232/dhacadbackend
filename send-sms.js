const accountSid = "AC3164788fff6b1fc268237a61e9f638fd";
const authToken = "3cd1bf5ef607d36d9a83027a99196b5d";
const client = require("twilio")(accountSid, authToken);

const run = async () => {
  await client.messages
    .create({
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: "+19362052967",
      to: "+923238421376",
    })
    .then((message) => console.log(message.sid))
    .catch((e) => {
      console.log("Error: ", e);
    });
};

run();

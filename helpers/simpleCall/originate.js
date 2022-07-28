"use strict";

const { parse, stringify } = require("flatted");
var client = require("ari-client");

const singleCall = (ENDPOINT) => {
  // replace ari.js with your Asterisk instance
  console.log("Client Connecting ...");
  client.connect(
    "http://ss.dextrologix.com:8088",
    "ears",
    "ears987",
    // client.connect('http://localhost:8088', 'ears', 'ears987',
    function (err, ari) {
      if (err) console.log(`Client Connection Error : ${err}`);
      else {
        console.log("Client Connected Successfully");
        ari.once("StasisStart", function (event, incoming) {
          var playback = ari.Playback();
          incoming.answer(function (err) {
            console.log(
              `Incoming Call: \n ${JSON.stringify(
                event,
                null,
                2
              )} \n ${incoming}`
            );
            incoming.play({ media: "sound:vm-dialout" }, playback, function (
              err
            ) {
              if (err)
                console.log(`PlayBack Error: ${JSON.stringify(err, null, 2)}`);
              else console.log(`PlayBack Successfull `);
            });
            originate(incoming);
          });
        });

        // if(playback){

        // }

        function originate(incoming) {
          console.log(`Call Originated: ${incoming}`);
          incoming.once("StasisEnd", function (event, channel) {
            console.log(`Call Hanged Up: ${JSON.stringify(event, null, 2)}`);
            outgoing.hangup(function (err) {});
          });
          var bridge = ari.Bridge();
          //   for (let i = 0; i < ENDPOINT.length; i++) {
          var outgoing = ari.Channel();

          outgoing.once("ChannelDestroyed", function (event, channel) {
            console.log(
              `Call Channel Destroyed: ${JSON.stringify(event, null, 2)}`
            );
            incoming.hangup(function (err) {});
          });

          outgoing.once("StasisStart", function (event, outgoing) {
            console.log(`Bridge Started: ${JSON.stringify(event, null, 2)}`);

            outgoing.once("StasisEnd", function (event, channel) {
              bridge.destroy(function (err) {
                if (err)
                  console.log(
                    `Call Ending Error: ${JSON.stringify(err, null, 2)}`
                  );
                else
                  console.log(`Call Ended: ${JSON.stringify(event, null, 2)}`);
              });
            });

            outgoing.answer(function (err) {
              if (err)
                console.log(
                  `Call Answering Error: ${JSON.stringify(err, null, 2)}`
                );
              else {
                console.log(`Bridge Mixing Started: `);
                bridge.create({ type: "mixing" }, function (err, bridge) {
                  if (err)
                    console.log(
                      `Bridge Mixing Error: ${JSON.stringify(err, null, 2)}`
                    );
                  else {
                    console.log(`Bridge Mixed Successfully}`);
                    bridge.addChannel(
                      { channel: [incoming.id, outgoing.id] },
                      function (err) {
                        if (err)
                          console.log(
                            `Bridge Channel Addition Error: ${JSON.stringify(
                              err,
                              null,
                              2
                            )}`
                          );
                        else {
                          console.log(`Bridge Channel Added Successfully: `);
                        }
                      }
                    );
                  }
                });
              }
            });
          });

          // Originate call from incoming channel to endpoint
          outgoing.originate(
            {
              endpoint: ENDPOINT,
              app: "originate-example",
              appArgs: "dialed",
            },
            // { endpoint: ENDPOINT[0], app: "originate-example", appArgs: "dialed" },
            // { endpoint1: ENDPOINT1, app: "originate-example", appArgs: "dialed" },
            function (err, channel) {
              if (err)
                console.log(`Call Origination Error: ( ${ENDPOINT} ) ${err}`);
              else console.log(`Call Origination Successfull: `);
            }
          );
        }

        // can also use ari.start(['app-name'...]) to start multiple applications
        console.log("Starting Originate Example");
        ari.start("originate-example");
      }
    }
  );
  return "Simple Call";
};

module.exports = {
  singleCall,
};

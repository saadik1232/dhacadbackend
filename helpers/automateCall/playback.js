"use strict";

var client = require("ari-client");
var util = require("util");

// replace ari.js with your Asterisk instance
const automateCall = (ENDPOINT) => {
  client.connect(
    "http://ss.dextrologix.com:8088",
    "ears",
    "ears987",

    function (err, ari) {
      if (err) console.log(`Client Connection error : ${err}`);
      else {
        var playback = ari.Playback();
        ari.once("StasisStart", function (event, incoming) {
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
          // incoming.answer(function (err) {
          //   if (err) console.log(`Client CALL answer error : ${err}`);
          //   else {
          //     var playback = ari.Playback();
          //     incoming.play(
          //       { media: "sound:demo-congrats" },
          //       playback,
          //       function (err, playback) {
          //         if (err) console.log(`Playback error : ${err}`);
          //         else {
          //           registerDtmfListeners(err, playback, incoming);
          //         }
          //       }
          //     );
          //   }
          // });
        });

        function registerDtmfListeners(err, playback, outgoing) {
          if (err) console.log(`Register Listener error`);
          else {
            outgoing.on("ChannelDtmfReceived", function (event, channel) {
              var digit = event.digit;
              switch (digit) {
                case "5":
                  playback.control({ operation: "pause" }, function (err) {});
                  break;
                case "8":
                  playback.control({ operation: "unpause" }, function (err) {});
                  break;
                case "4":
                  playback.control({ operation: "reverse" }, function (err) {});
                  break;
                case "6":
                  playback.control({ operation: "forward" }, function (err) {});
                  break;
                case "2":
                  playback.control({ operation: "restart" }, function (err) {});
                  break;
                case "#":
                  playback.control({ operation: "stop" }, function (err) {});
                  outgoing.hangup(function (err) {
                    process.exit(0);
                  });
                  break;
                default:
                  console.error(util.format("Unknown DTMF %s", digit));
              }
            });
          }
        }
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
                outgoing.play(
                  { media: "sound:demo-congrats" },
                  playback,
                  function (err) {
                    if (err)
                      console.log(
                        `PlayBack Error: ${JSON.stringify(err, null, 2)}`
                      );
                    else {
                      console.log(`PlayBack Successfull `);
                      registerDtmfListeners(err, playback, outgoing);
                    }
                  }
                );
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
              app: "playback-example",
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
        ari.start("playback-example");
      }
    }
  );
  return "Playback Call";
};

module.exports = {
  automateCall,
};

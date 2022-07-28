"use strict";
const client = require("ari-client");
const { red, green, gray, blue, cyan, grey, yellow } = require("colors");

const Conference = async (ENDPOINT) => {
  console.log("Client Connecting ...");
  client.connect(
    "http://ss.dextrologix.com:8088",
    "ears",
    "ears987",
    (err, ari) => {
      let calls = [];
      if (err) console.log(red(`\n\n Client Connection Error : ${err}`));
      else {
        console.log(blue(`\n\n >> Client Connection Success`));
        ari.once("StasisStart", (event, incoming) => {
          let playback = ari.Playback();
          console.log(yellow(` >> Play Back has been set Successfully`));
          console.log(cyan(` >> Stasis has Successfully Started ...`));
          incoming.answer((err) => {
            console.log(blue(` >> InComing Call Generated ...`));
            incoming.play({ media: "sound:vm-dialout" }, playback, (err) => {
              if (err) console.log(red(` >> Play Back Audio Error`));
              else console.log(green(` >> PlayBack Successfull `));
            });
            originate(incoming);
          });
        });
      }
      async function originate(incoming) {
        console.log(yellow(` >> Call Originated ...`));
        incoming.once("StasisEnd", function (event, channel) {
          console.log(gray(` >> Stasis has Ended `));
          for (let j = 0; j < calls.length; j++) {
            let call = calls[j];
            call.hangup((err) => {
              if (err)
                console.log(
                  red(` >> Call ( ${call} ) Could not be Hunged Up: ${err}`)
                );
              else console.log(red(` >> Call ( ${call} ) Hunged Up !`));
            });
          }
        });
        let bridge = ari.Bridge();
        for (let i = 0; i < ENDPOINT.length; i++) {
          var outgoing = ari.Channel();
          console.log(
            yellow(
              ` >> ${ENDPOINT[i]} - Channel Created with Id: ${outgoing.id}`
            )
          );
          calls.push(outgoing);
          console.log(cyan(` >> Calls Array Appended - ( ${calls.length} )`));
          outgoing.once("StasisStart", (event, outgoing) => {
            console.log(cyan(` >> Bridge Started ... `));
            outgoing.once("StasisEnd", (event, channel) => {
              console.log(gray(` >> Out Going Stasis Ended: ${outgoing.id}`));
              calls = calls.filter((item) => item.id != outgoing.id);
              if (calls.length == 0) {
                bridge.destroy(function (err) {
                  if (err) console.log(red(` >> Conference Ending Error `));
                  else console.log(green(` >> Conference Ended `));
                });
              }

              //   ari.bridges.removeChannel(
              //     { bridgeId: bridge.id, channel: outgoing.id },
              //     (err) => {
              //       if (err)
              //         console.log(
              //           red(
              //             ` >> Bridge Destuction Error \n >>>> Bridge: ${bridge.id} \n >>>> Channel: ${outgoing.id} \n >>>> Error: ${err}`
              //           )
              //         );
              //       else
              //         console.log(
              //           green(` >> Channel Removed Successfully: ${outgoing.id}`)
              //         );
              //     }
              //   );
            });
            outgoing.answer((err) => {
              if (err) console.log(red(` >> Conference Call Answering Error `));
              else {
                console.log(green(` >> Bridge Mixing Started: ${bridge.id} `));
                bridge.create({ type: "mixing" }, (err, bridge) => {
                  if (err) console.log(red(` >> Bridge Mixing Error `));
                  else {
                    console.log(
                      green(
                        ` >> Bridge Mixed Successfully: Incoming: ${incoming.id} , Outgoing: ${outgoing.id}`
                      )
                    );
                    bridge.addChannel(
                      { channel: [incoming.id, outgoing.id] },
                      (err) => {
                        if (err)
                          console.log(
                            red(` >> Bridge Channel Addition Error `)
                          );
                        else {
                          console.log(
                            green(` >> Bridge Channel Added Successfully `)
                          );
                        }
                      }
                    );
                  }
                });
              }
            });
          });
          outgoing.originate(
            {
              endpoint: ENDPOINT[i],
              app: "originate-example",
              appArgs: "dialed",
            },
            (err, channel) => {
              if (err)
                console.log(
                  red(` >> Call Origination Error: ( ${ENDPOINT[i]} ) ${err}`)
                );
              else {
                console.log(
                  green(
                    ` >> Call Origination for ( ${ENDPOINT[i]} ) Successfull `
                  )
                );
              }
            }
          );
        }
      }
      console.log(green(` >> Starting Originate Example`));
      ari.start("originate-example");
    }
  );
  return "Conference Call";
};

module.exports = {
  Conference,
};

// Conference(["PJSIP/1005", "PJSIP/1006"]);

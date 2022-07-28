// var geocoding = new require("reverse-geocoding");
// var config = {
//   latitude: 31.4899,
//   longitude: 74.4496,
//   language: "zh-cn",
// };
// geocoding(config, (err, data) => {
//   console.log(err ? err : data);
// });

var geocoder = require("local-reverse-geocoder");

var point = { latitude: 42.083333, longitude: 3.1 };

var maxResults = 5;

console.log("Hello Out");

geocoder.lookUp(point, maxResults, function (err, res) {
  console.log(JSON.stringify(res));
  console.log("Hello");
});

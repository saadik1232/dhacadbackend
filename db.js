const mysql = require("mysql2");
// create the connection to database
var database = "cad";
const connection = mysql.createConnection({
  host: "",
  user: "u567001185_zaeem",
  password: "",
  database: "u567001185_cad",
});
// simple query
return connection.query("SELECT * FROM test", function (err, results, fields) {
  console.log(results);
});
// console.log("Hello");

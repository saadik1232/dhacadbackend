/**
 * Web & API Essential Libraries
 */
const express = require("express");
const morgan = require("morgan");
//var multer  = require("multer")
var path = require("path");
//   fileUpload = require("express-fileupload"),
//   mysql = require("mysql"),
//   bodyParser = require("body-parser");

// /**
//  * Adding Http Library to the Project
//  */
// const http = require('http');

// /**
//  * Adding Socket to the Project
//  */
// const server = http.createServer();

/**
 * API Standard Middlewares
 */
const session = require("express-session");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
// const redis = require("redis");

/**
 * Node Js Third Party Modules Required
 */
const ip = require("ip");
var myIp = ip.address();
// const ip = require("../panic-api-node-v1/configs/config");
// var myIp = ip.IP;
/**
 * Custom Helpers
 */
const { fire, auth, ind } = require("./helpers/fire");
const RES = require("./helpers/utils").response;

/**
 * Server Setup & Configurations
 */
const app = express();
const http = require("http");
const server = http.createServer(app);
const port = 3001;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(fileUpload());

/**
 * Socket Importing
 */
const io = require("socket.io")(server);

/**
 * Add all the Scket End Points in the Project over here
 */
io.on("connection", (client) => {
  client.on("onResponderLocationUpdate", (data) => {
    // In accordance to the Data from the App
  });
  client.on("onResponderLocationFetch", (data) => {
    // In accordance to the Data from the App
  });
  client.on("onPanicAlertLocationFetch", (data) => {
    // In accordance to the Data from the App
  });
  client.on("disconnect", () => {
    /* … */
  });
});

/**
 * Standard Middlewares
 */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(
  session({
    secret: "123456",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(cors());
app.use(morgan("dev"));
/**
 * Customer Middlewares
 */
app.use(require("./middlewares/parameterization"));
const Auth = require("./middlewares/auth").tokenAuth;

/**
 * Project ( Parent ) Routes Defined
 */
app.use("/auth", require("./routes2/auth"));
app.use("/bank", require("./routes2/bank"));
app.use("/user", require("./routes2/user"));
app.use("/service", require("./routes2/service"));
app.use("/subscription", require("./routes2/subscription"));
app.use("/nature", require("./routes2/nature"));
app.use("/third-Party", require("./routes2/thirdParty"));
app.use("/priority", require("./routes2/priority"));
app.use("/status", require("./routes2/status"));
app.use("/role", require("./routes2/role"));
app.use("/city", require("./routes2/city"));
app.use("/town", require("./routes2/town"));
app.use("/logs", require("./routes2/logs"));
app.use("/operator", require("./routes2/operator"));
app.use("/customer", require("./routes2/customer"));
app.use("/supervisor", require("./routes2/supervisor"));
app.use("/responder", require("./routes2/responder"));
app.use("/geo", require("./routes2/geo"));
app.use("/panic", require("./routes2/panic"));
app.use("/customer-family", require("./routes2/customerFamily"));
app.use("/responder-member", require("./routes2/responderMember"));
app.use("/verification", require("./routes2/verifications"));
app.use("/geofence", require("./routes2/geofence"));
app.use("/notification-logs", require("./routes2/notificationLogs"));
app.use("/chat-logs", require("./routes2/chatLogs"));
app.use("/panic-logs", require("./routes2/panicLogs"));
app.use("/calls", require("./routes2/call"));

//my table data

//above is new try
app.use("/publicnotification", require("./routes2/publicnotification"));
app.use("/privatenotification", require("./routes2/privatenotification"));
app.use("/usernotification", require("./routes2/UserNotification"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(fileUpload());
app.use("/image", require("./routes2/ImageUpload"));
//chenges for image
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())
// app.use("/service-provider", require("./routes/serviceProvider"));
// app.use("/natures", require("./routes/nature"));
// app.use("/priorities", require("./routes/priority"));
// app.use("/statuses", require("./routes/status"));
// app.use("/panics", require("./routes/panic"));
// app.use("/assigned", require("./routes/assigned"));

/**
 * Routes Testing Section
 */
app.use("/test", (req, res, next, Data = {}) => {
  // fire("PanicAlarmUser1", " Test ", "Test Alert Created Successfully", {
  //   KeyIntent: "TestALert",
  // });
  ind(
    "d_Oz-5P4cN0:APA91bGVssLSbDt3RP4Oq5Ed74sMKdaCTdm5sjHCr6C5OwGK0bYhQZ7SuEW-kIS0dTVt5ihetN99jghDZZ9J2ZEBVNGzf6u9JoY3J_-LW0PYohOw8nKuIjjjmp4b2PVjuuxJ0mK4gLfS",
    "Hello",
    "wow",
    { name: "zaeem" },
    (data) => {
      // res.json(data);
    }
  );
  res.json("test");
});

// /**
//  * Routes Error Handling
//  */
app.use((req, res, next) => {
  res.json(RES(404, "Page Or Url Not Found"));
});

/**
 * Routes Data Handling
 */
app.post("/testData", (req, res, next) => {
  // var uid = "TzadlPHCAeSFJzwTNnf3OOOR34Z2";
  // auth(uid, (data) => {
  //   res.json(RES(200, "Success", data));
  // });
  var fcm =
    "cRQ0yJYldzE:APA91bHXRz0Dgfb8P5n01x2cciTpAjgFQmVdzESzXBe_lFnVCD_S3D80eKVRcZPdK07eKdAeQ98jKZk5liJCj3cVsHvPNBrArasKr5oxhQAkLJK7H8oL8QGFzpTsG04wlF6fNIkNtMqq";
  ind(fcm, { name: "Zaeem Tarrar" }, (data) => {
    res.json(RES(200, "Success", data));
  });
});

/**
 * Importing Seeding Helper File
 */
const Seed = require("./seeds/seeds");

/**
 * Fire the Seeder to Refresh the Database to Placing the Dummy Data
 */
Seed(false);

/**
 * Launching the Server to Listen to all the API Requests over Defined IP & PORT
 */
server.listen(port, () =>
  console.log("Application Started at " + myIp + ":" + port)
);

var RES = require("../helpers/utils").response;

var userAccount = [
  {
    id: 1,
    name: "zaeem tarrar",
    account: "1305223024342",
    securityPin: "237"
  }
];

module.exports.verify = (req, res, next) => {
  var data = null;
  if (
    req.body.param != null &&
    req.body.param != "" &&
    typeof req.body.param != "undefined" &&
    req.body.param != {}
  ) {
    data = req.body.param;
  } else {
    data = req.body;
  }
  var { name, account, securityPin } = data;
  var data = [];
  data = userAccount.filter(u => {
    console.log(name, u.name);
    console.log(account, u.account);
    console.log(securityPin, u.securityPin);
    return (
      name == u.name && account == u.account && securityPin == u.securityPin
    );
  });
  if (data.length > 0) {
    res.json(RES(200, "Access Granted"));
  } else {
    res.json(RES(403, "Access Denied"));
  }
};

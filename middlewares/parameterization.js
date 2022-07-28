module.exports = (req, res, next) => {
  var data = null;
  if (req.body.param) data = req.body.param;
  else data = req.body;
  req.body = { ...data };
  next();
};

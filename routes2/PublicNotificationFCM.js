exports.index = function (req, res) {
  message = "";
  if (req.method == "POST") {
    var post = req.body;
    var heading = post.heading;
    var Message = post.Message;
    var topic = post.topic;

    if (!req.files) return res.status(400).send("No files were uploaded.");

    var file = req.files.uploaded_image;
    var img_name = file.name;

    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      file.mv("public/images/upload_images/" + file.name, function (err) {
        if (err) return res.status(500).send(err);
        var sql =
          "INSERT INTO `publicnotification`(`heading`,`Message`,`topic`,`image`) VALUES ('" +
          heading +
          "','" +
          Message +
          "','" +
          topic +
          "', '" +
          image_name +
          "')";

        var query = db.query(sql, function (err, result) {
          //  res.redirect('profile/'+result.insertId);
          //res.message("hello");
          //res= console.log("hello");
          res.send("response");
        });
      });
    } else {
      message =
        "This format is not allowed , please upload file with '.png','.gif','.jpg'";
      // res.render('index.ejs',{message: messa});ge
      res = console.log("hello");
    }
  } else {
    // res.render('index');
    //res.message("hello");
    //res= console.log("hello");
    //res.send("response from get");
    //////// my own get code from here

    var sql = "SELECT * FROM `users_image`";
    db.query(sql, function (err, result) {
      if (result.length <= 0) message = "Profile not found!";

      //res.render('profile.ejs',{data:result, message: message});
      res.send(result);
    });

    /////////////////////// my own code ends here
  }
};

exports.profile = function (req, res) {
  var message = "";
  var id = req.params.id;
  var sql = "SELECT * FROM `users_image` WHERE `id`='" + id + "'";
  db.query(sql, function (err, result) {
    if (result.length <= 0) message = "Profile not found!";

    res.render("profile.ejs", { data: result, message: message });
  });
};

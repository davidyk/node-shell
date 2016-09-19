var fs = require("fs");
var request = require("request");

module.exports.pwd = function () {
      process.stdout.write(process.cwd());
}

module.exports["date"] = function () {
    console.log(Date());
}

module.exports.ls = function () {
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
    process.stdout.write(file.toString() + "\n");
  })
  process.stdout.write("prompt > ");
});
}


module.exports.echo = function (textArray, cb) {

  console.log(textArray.join(" "));
}

module.exports.cat = function (fileName) {

  fs.readFile(fileName[0], "utf8", function (err, data) {
    if (err) throw err;

    cb(data);
});

}

module.exports.head = function (fileName, cb) {

  fs.readFile(fileName[0], "utf8", function (err, data) {
    if (err) throw err;

    var output = data.split("\n");
    for (var i = 0; i < 10; i++) {
      cb(output[i] + "\n");
    }
  });
}

module.exports.tail = function (fileName, cb) {

  fs.readFile(fileName[0], "utf8", function (err, data) {
    if (err) throw err;

    var output = data.split("\n");
    for (var i = output.length - 10; i < output.length; i++) {
      cb(output[i] + "\n")
    }
  });
}

// curl www.google.com
module.exports.curl = function(argArray, cb){
  var URL = argArray[0];

  request(URL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cb(body)
    }
  })

}

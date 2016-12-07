const fs = require("fs");
const FileStreamRotator = require('file-stream-rotator');
const morgan = require("morgan");
const logDirectory = __dirname + '/../logs'; //one folder above the present directory

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream 
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'DD.MM.YYYY',
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
});

module.exports = {morgan,accessLogStream};

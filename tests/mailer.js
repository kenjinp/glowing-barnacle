//------------------------------Config
var config = require('../config.js');
//------------------------------Config
var mailerService = require('../services/mailer.js');
var mailer = new mailerService(config.mailer, console);

mailer.send({
 subject: 'test',
 text: 'text test',
 html: '<h1>HTML TEST</h1>'
});

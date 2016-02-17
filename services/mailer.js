var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');
var _ = require('underscore');

var mailer = function(mail, logger) {

  this.logger = logger;

  if(mail) {

    this.transporter = nodemailer.createTransport(mandrillTransport(mail.transporter));
    this.defaults = {
        to: mail.to,
        from: mail.from
    };
    this.configured = true;

  } else {

    this.configured = false;

  }

  _.bindAll(this, 'send');

};

mailer.prototype.send = function(options) {

  if(this.configured) {

    var mailOptions = _.extend(options, this.defaults);

    this.transporter.sendMail(mailOptions, function(error, info) {
        if (error){
            throw error;
        }
        this.logger.log('Email sent: ' + JSON.stringify(info, null, 2));
    }.bind(this));

  } else {

    this.logger.log('Emailer Misconfigured');

  }

};

module.exports = mailer;

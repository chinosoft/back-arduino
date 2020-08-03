var nodemailer = require('nodemailer');
const express = require("express");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arquitectura.avanzada.grupo1@gmail.com',
    pass: '*****'
  }
});

app.get("/mail", function (req, res) {
  var mailOptions = {
    from: 'arquitectura.avanzada.grupo1@gmail.com',
    to: req.mailTo,
    subject: 'Limit exceeded',
    text: `Limite excedido del sensor ${req.name} a las ${req.date}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

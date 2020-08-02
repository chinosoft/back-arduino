var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arquitectura.avanzada.grupo1@gmail.com',
    pass: 'Arq123456'
  }
});

var mailOptions = {
  from: 'arquitectura.avanzada.grupo1@gmail.com',
  to: 'm.popovich20@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'JURUJUJAJA averigua con que te estoy enviando este correo ???????'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
const express = require("express");
const SerialPort = require("serialport");
var nodemailer = require('nodemailer');
const socketIo = require("socket.io");

const app = express();
app.set("port", process.env.PORT || 3000);

var number;
var number2;
var number3;
var vec;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", function (req, res) {
  res.send("Arquitectura Avanzada Equipo 1 is running...");
});

app.get("/sensor", function (req, res) {
  mySerial.write("PIRU\n");
  parser.once("data", function (response) {
    vec = response.split(",");
    number3 = vec[0] / 40.92;
    number = vec[1] / 4.65;
    number2 = vec[2] / 10.23;
  });
  res.send({ speed: number, fuel: number2, capacity: number3 });
});

app.get("/led/:action", function (req, res) {
  var action = req.params.action || req.param("action");

  setTimeout(() => {
    if (action == "on") {
      mySerial.write("LEDON\n");
      return res.send("Led light is on!");
    }
    if (action == "off") {
      mySerial.write("LEDOFF\n");
      return res.send("Led light is off!");
    }
  }, 2000);
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arquitectura.avanzada.grupo1@gmail.com',
    pass: 'Arq123456'
  }
});

app.post("/mail", function (req, res) {
  console.log("que numero viene: " + req.body.num);

  var mailOptions = {
    from: 'arquitectura.avanzada.grupo1@gmail.com',
    to: req.body.emailTo,
    subject: 'Limit exceeded',
    text: `Limite excedido del sensor ${req.body.name} a las ${req.body.date}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

app.listen(app.get("port"), () => {
  console.log(`server running on port ${app.get("port")}`);
});

const Readline = SerialPort.parsers.Readline;
const parser = new Readline({ delimiter: "\r\n" });
const mySerial = new SerialPort("COM3", {
  baudRate: 9600,
});
mySerial.pipe(parser);

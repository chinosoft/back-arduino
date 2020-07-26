const express = require("express");
const SerialPort = require("serialport");
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

//http://localhost:3001/sensor1
app.get("/sensor", function (req, res) {
  mySerial.write("SCAN(0,2)\n");
  parser.on("data", function (response) {
    console.log("hola " + response);

    number = response;
  });
  res.send({ speed: number, fuel: number2, capacity: number3 });
});

/*
//http://localhost:3001/led1On
app.get('/led1On', function(req, res) {
  console.log(req);
  T.get('/led1', req.query, function(err, data, response) {
      return res.json(data);
  })
})

//http://localhost:8080/led1Off
app.get('/led1Off', function(req, res) {
  console.log(req);
  T.get('/led1', req.query, function(err, data, response) {
      return res.json(data);
  })
})
*/
app.listen(app.get("port"), () => {
  console.log(`server running on port ${app.get("port")}`);
});

const Readline = SerialPort.parsers.Readline;
const parser = new Readline({ delimiter: "\r\n" });
const mySerial = new SerialPort("COM5", {
  baudRate: 9600,
});
mySerial.pipe(parser);

/*
mySerial.on('open', function(){
  console.log('Conexion serial iniciada');
  parser.on('data', function (data){
    console.log(data);
    var dado = parseInt((data*100)/1023);
        console.log(dado);
  });
  
});*/

/*
const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: '\n'});
const mySerial = new SerialPort("COM3", { 
  baudRate: 9600
});
mySerial.pipe(parser);


mySerial.on('open', function(){
  console.log('Conexion serial iniciada');
  parser.on('data', function (data){
    console.log(data);
    var dado = parseInt((data*100)/1023);
        console.log(dado);
  })
});
/*
parser.on('data', function (data){
  console.log(data);
});


app.get('/:action', function (req, res) {
  var action = req.params.action || req.params('action');
  console.log(action);
  mySerial.write(action);
  mySerial.write('/n');
  res.status(200).send('ok');
});

  

app.listen(app.get('port'), ()=> {
  console.log(`server running on port ${app.get('port')}`);
})
*/

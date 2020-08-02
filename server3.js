const express = require('express');
const app = express();

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort("COM3", { 
  baudRate: 9600
});
const parser = port.pipe(new Readline({delimiter: '\n'}));

app.use(express.urlencoded({ extended:false}))
app.use(express.json());

parser.on("data", function (data) {
  console.log(data);
});

app.get('/chino', function (req, res) {
  //var action = req.params.action || req.params('action');
  //port.write(action);
  port.write('RADC(0)');
  const prueba = '';
  parser.on("data", function (data) {
      console.log(data);
      prueba = data;
  })
  res.send({ "sensor2": prueba});
});


app.get('/', function(req,res){
  res.status(200).json({chino: 'hola merda'});
})

app.listen(3000, function () {
  console.log("listening");
})
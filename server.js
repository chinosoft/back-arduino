
const express = require('express');
const SerialPort = require('serialport');
const socketIo = require('socket.io');


const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({ extended:false}))
app.use(express.json());


app.get('/', function (req, res) {
   res.send('Arquitectura Avanzada Equipo 1 is running...')
});

//http://localhost:3001/sensor1
app.get('/sensor1', function (req, res) {
  try{
      mySerial.write("SCAN(1,1)\n");
      parser.on('data', function (data) {
      console.log(data);
      res.send({ sensor1: data});
    });

     // res.send({ sensor1: 'data'});
  }
  catch(e){
    res.send(e);
  }
})

//http://localhost:3001/sensor2
app.get('/sensor2', function (req, res) {
  res.send({ sensor2: 'datasensor2' 
  })
})

//http://localhost:3001/sensor3
app.get('/sensor3', function (req, res) {
  res.send({ sensor3: 'datasensor3' 
  })
})

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
app.listen(app.get('port'), ()=> {
  console.log(`server running on port ${app.get('port')}`);
})


const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: '\r\n'});
const mySerial = new SerialPort("COM3", { 
  baudRate: 9600
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
const SerialPort = require('serialport');
const express = require('express');
const socketIo = require('socket.io');

const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.sendfile(__dirname + '/public/index.html')

});

app.get('/sensor1', (req, res) => {
  res.sendfile(__dirname + '/public/index.html')
      let _model = req.query.turn;

      if (this.board.isReady) {
        if (_model == "on") {
          this.board.led.on();
        } else {
          this.board.led.off();
        }
      }
      res.send({ result: _model });
    });

    this.app.route("/").get((req, res) => {
      res.send({ result: this.status });
    });
  





server.listen(9999, () =>{
  console.log('Puerta de entrada 192.168.1.65:%d', server.address().port);

});

const io = socketIo.listen(server);

const Readline = SerialPort.parsers.Readline;
const parser = new Readline({delimiter: '\r\n'});
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

    io.emit('serial:data', {
      value: dado.toString()
    });
  });
});

//pasando los datos al puerto serial

io.sockets.on('connection', function(socket){
  //console.log('no conecta');
  socket.on('btnAction', function(btn){
    if (btn.value == 'a'){
      console.log(btn.value);
      console.log("SCAN(0,2)"); 
      mySerial.write("SCAN(0,2)\n");
    }
    if (btn.value == 'b'){
      console.log(btn.value);
      console.log("WRDO(13,1)"); 
      mySerial.write("WRDO(13,1)\n");
    }
    if (btn.value == 'c'){
      console.log(btn.value);
      console.log("WRDO(13,0)"); 
      mySerial.write("WRDO(13,0)\n");
    }
  })
});


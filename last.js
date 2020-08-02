var SerialPort = require('serialport');// include the library
var WebSocketServer = require('ws').Server;
// get port name from the command line:
var portName = "COM3";;

var myPort = new SerialPort(portName, 9600);

var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
myPort.pipe(parser); // pipe the serial stream to the parser


var SERVER_PORT = 8081;               // port number for the webSocket server
var wss = new WebSocketServer({port: SERVER_PORT}); // the webSocket server
var connections = new Array;          // list of connections to the server

myPort.on('open', showPortOpen);
parser.on('data', readSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

function showPortOpen() {
  console.log('port open. Data rate: ' + myPort.baudRate);
}

function readSerialData(data) {
  console.log(data);
} 

function showPortClose() {
  console.log('port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}

myPort.write ("SCAN(0,1)/n");

function sendToSerial(data) {
  console.log("sending to serial: " + data);
  myPort.write(data);
 }

 function openSocket() {
  text.html("Socket open");
  socket.send("Hello server");
}


 function readSerialData(data) {
  console.log(data);
  // if there are webSocket connections, send the serial data
  // to all of them:
  if (connections.length > 0) {
    broadcast(data);
  }
}

function showData(result) {
  // when the server returns, show the result in the div:
  text.html("Sensor reading:" + result.data);
  xPos = int(result.data); // convert result to an integer
  text.position(xPos, 10); // position the text
  socket.send('a');        // send a byte to get the Arduino to send new data
  }

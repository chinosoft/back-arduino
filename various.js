const { Router } = require("express");
const router = Router();
const express = require("express");
const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
const parser = new Readline({ delimiter: "\r\n" });

const app = express();
router.use(express.urlencoded({ extended:false}))

router.use(express.json());

app.set("port", process.env.PORT || 3000);

router.get("/", (req, res) => {

   sendToSerial('WRDO(13,1)/n');

 /* port.write('WRDO(13,1)/n');
    const datos = parser.on("data", function (data) {
    console.log(data);
    console.log('wtf');
  });
  */
  res.status(200).json({data: 'Ok'});

//res.status(200).json({data: data});
});

app.listen(3000, function () {
   console.log("listening");
 })

 function sendToSerial(data) {
   console.log("sending to serial: " + data);
   myPort.write(data);
  }
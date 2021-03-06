const express = require("express");
const SerialPort = require("serialport");
var nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const socketIo = require("socket.io");
const Excel = require("exceljs");

const excel_file_path = "excel_templates/vehicledata_excel_file.xlsx";

const app = express();
app.set("port", process.env.PORT || 3000);

var number;
var number2;
var number3;
var vec;

var serviceAccount = require("./admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://autoarduino-2b80f.firebaseio.com",
});

var db = admin.database();
var vehicleRef = db.ref("Cars/0/VehicleData");

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

app.get("/vehicle-data", (req, resp) => {
  vehicleRef.once(
    "value",
    function (snapData) {
      var count = snapData.numChildren();
      console.log("count : " + count);

      readWriteToExcelfile(snapData);
    },
    function (errorObj) {
      console.log("function(errorObj)");
    }
  );
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

  if (action == "on") {
    mySerial.write("LEDON\n");
    return res.send("Led light is on!");
  }
  if (action == "off") {
    mySerial.write("LEDOFF\n");
    return res.send("Led light is off!");
  }
});

app.get("/led2/:action", function (req, res) {
  var action = req.params.action || req.param("action");

  if (action == "on") {
    mySerial.write("LEDON2\n");
    return res.send("Led 2 light is on!");
  }
  if (action == "off") {
    mySerial.write("LEDOFF2\n");
    return res.send("Led 2 light is off!");
  }
});

app.get("/led3/:action", function (req, res) {
  var action = req.params.action || req.param("action");

  if (action == "on") {
    mySerial.write("LEDON3\n");
    return res.send("Led 3 light is on!");
  }
  if (action == "off") {
    mySerial.write("LEDOFF3\n");
    return res.send("Led 3 light is off!");
  }
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arquitectura.avanzada.grupo1@gmail.com",
    pass: "Arq123456",
  },
});

app.post("/mail", function (req, res) {
  console.log("que numero viene: " + req.body.number);

  var mailOptions = {
    from: "arquitectura.avanzada.grupo1@gmail.com",
    to: req.body.emailTo,
    subject: "Limit exceeded",
    text: `Limite excedido del sensor ${req.body.name} con un valor de ${req.body.number} el ${req.body.date}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
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

function readWriteToExcelfile(snapData) {
  // create a workbook variable
  var workbook = new Excel.Workbook();

  // read excel file from the path
  workbook.xlsx.readFile(excel_file_path).then(function () {
    // access the excel sheet
    var worksheet = workbook.getWorksheet("Hoja1");

    addRowsToExcelSheet(snapData, workbook, worksheet);
  });
}

// code to write data into excel sheet
function addRowsToExcelSheet(snapData, workbook, worksheet) {
  // for loop to read each record from Products table
  snapData.forEach(function (data) {
    // get value for the record
    const val = data.val();

    // Add a row by sparse Array (assign to columns)
    var rowValues = [];
    rowValues[1] = val.speed;
    rowValues[2] = val.fuel;
    rowValues[3] = val.capacity;
    rowValues[4] = val.date;

    // add row to worksheet
    worksheet.addRow(rowValues);
  });

  //write file function to save all the data to the excel template file.
  workbook.xlsx.writeFile(excel_file_path).then(function () {
    console.log("saved to excel file successfully");
  });
}

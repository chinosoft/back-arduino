const express = require("express");
const bodyParser = require("body-parser");
const five = require("johnny-five");

class Server2 {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
    this.managerLed();
  }

  middleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  managerLed() {
    this.board = new five.Board();
    this.board.on("ready", function () {
      this.board.samplingInterval(3000);
      this.led = new five.Led(13);
      this.potentiometer = new five.Sensor("A3");
      this.photoresistor = new five.Sensor({
        pin: "A0",
        freq: true,
      });
      this.board.repl.inject({
        pot: this.photoresistor,
      });
    });
  }

  routes() {
    this.app.route("/led").get((req, res) => {
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

    this.app.route("/photoresistor").get((req, res) => {
      this.photoresistor.on("data", function () {
        console.log("value: " + this.value);
        res.send(this.value);
      });
    });

    this.app.route("/potentiometer").get((req, res) => {
      if (this.board.isReady) {
        this.potentiometer.on("change", () => {
          const { value, raw } = this.potentiometer;
          console.log("value: " + value);
          res.send({data: value});
        });
      }
    });

    this.app.route("/").get((req, res) => {
      res.send({ result: this.status });
    });
  }
}
exports.default = new Server2();
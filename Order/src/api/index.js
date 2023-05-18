const Hermes = require("hermesjs");
const mongoose = require("mongoose");
const app = new Hermes();
const path = require("path");
const { yellow, gray, cyan } = require("chalk");
const buffer2string = require("./middlewares/buffer2string");
const string2json = require("./middlewares/string2json");
const json2string = require("./middlewares/json2string");
const logger = require("./middlewares/logger");
const errorLogger = require("./middlewares/error-logger");
const config = require("../lib/config");
const serverConfig = config.broker.amqp;
const AmqpAdapter = require("hermesjs-amqp");
const orderCheckout = require("./routes/order-checkout.js");
const orderCreate = require("./routes/order-create.js");
const mongoDB = "mongodb://127.0.0.1/headless";

app.addAdapter(AmqpAdapter, serverConfig);

app.use(buffer2string);
app.use(string2json);
app.use(logger);

mongoose.set("strictQuery", false);

// Channels
console.log(
  cyan.bold.inverse(" SUB "),
  gray("Subscribed to"),
  yellow("order/checkout")
);
app.use(orderCheckout);
console.log(
  cyan.bold.inverse(" SUB "),
  gray("Subscribed to"),
  yellow("order/create")
);
app.use(orderCreate);

app.use(errorLogger);
app.useOutbound(errorLogger);
app.useOutbound(logger);
app.useOutbound(json2string);

app
  .listen()
  .then((adapters) => {
    mongoose
      .connect(mongoDB)
      .then(() => {
        console.log(
          "Database connection to",
          cyan.underline(`${mongoDB}`),
          "is ready"
        );
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(
      cyan.underline(`${config.app.name} ${config.app.version}`),
      gray("is ready!"),
      "\n"
    );
    adapters.forEach((adapter) => {
      console.log("🔗 ", adapter.name(), gray("is connected!"));
    });
  })
  .catch(console.error);

exports.app = app;
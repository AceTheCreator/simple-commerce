const amqp = require("amqplib/callback_api");
const { listener } = require("../utils/events");


let amqpConn = null;
module.exports = {
  InitConnection: (fnFinish) => {
    // Start connection with Rabbitmq
    amqp.connect("amqp://rabbitmq:rabbitmq@localhost:5672", (err, conn) => {
      // If connection error
      if (err) {
        console.error("[AMQP]", err.message);
        return setTimeout(this, 1000);
      }

      conn.on("error", function (err) {
        console.log("ERROR", err);
        if (err.message !== "Connection closing") {
          console.error("[AMQP] conn error", err.message);
        }
      });

      conn.on("close", function () {
        // Reconnect when connection was closed
        console.error("[AMQP] reconnecting");
        return setTimeout(() => {
          module.exports.InitConnection(fnFinish);
        }, 1000);
      });

      // Connection OK
      console.log("[AMQP] connected");
      amqpConn = conn;
      // Execute finish function
      fnFinish();
    });
  },
  StartConsumer: (queue, fnConsumer) => {
    // Create a channel for queue
    amqpConn.createChannel(async function (err, ch) {
      if (closeOnErr(err)) return;

      ch.on("error", function (err) {
        console.error("[AMQP] channel error", err.message);
      });

      ch.on("close", function () {
        console.log("[AMQP] channel closed");
      });

      ch.prefetch(10);

      ch.assertQueue(queue, { durable: true }, function (err, _ok) {
        if (closeOnErr(err)) return;
        // Consume incoming messages
        ch.consume(queue, processMsg, { noAck: false });
        console.log("[AMQP] Worker is started");
      });

      function processMsg(msg) {
        // Process incoming messages and send them to fnConsumer
        // Here we need to send a callback(true) for acknowledge the message or callback(false) for reject them
        fnConsumer(msg, function (ok) {
          try {
            ok ? ch.ack(msg) : ch.reject(msg, true);
          } catch (e) {
            closeOnErr(e);
          }
        });
      }

      console.log("[AMQP] Consumer started");
    });
  },
  StartPublisher: () => {
    // Init publisher
    amqpConn.createConfirmChannel(function (err, ch) {
      if (closeOnErr(err)) return;

      ch.on("error", function (err) {
        console.error("[AMQP] channel error", err.message);
      });

      ch.on("close", function () {
        console.log("[AMQP] channel closed");
      });

      // Set publisher channel in a var
      pubChannel = ch;
      console.log("[AMQP] Publisher started");
    });
  },
  PublishMessage: async (exchange, routingKey, content, options = {}) => {
    // Verify if pubchannel is started
    if (!pubChannel) {
      console.error(
        "[AMQP] Can't publish message. Publisher is not initialized. You need to initialize them with StartPublisher function"
      );
      return;
    }
    // convert string message in buffer
    const message = Buffer.from(content, "utf-8");
    try {
      // Publish message to exchange
      // options is not required
      pubChannel.publish(exchange, routingKey, message, options, (err) => {
        if (err) {
          console.error("[AMQP] publish", err);
          pubChannel.connection.close();
          return;
        }
        console.log("[AMQP] message delivered");
      });
      const parsedMessage = JSON.parse(message);
      const response = await listener(parsedMessage.reqId);
      return response
    } catch (e) {
      console.error("[AMQP] publish", e.message);
    }
  },
};

function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}

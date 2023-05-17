const rabbitmqLib = require("../configs/rabbitmq-connection");
const { emitter } = require("../utils/events");
const { v4: uuidv4 } = require("uuid");

async function add(req, reply) {
  const { name, image, type, price, description } = req.body;
  const reqId = uuidv4();
  try {
    rabbitmqLib.PublishMessage(
      "headlessExchange",
      "catalog.add",
      Buffer.from(JSON.stringify({ name, image, price, type, description })),
      {
        correlationId: reqId,
        headers: { token: "22985beb-5734-4689-8253-19faf075b6cd" },
      }
    );
  } catch (error) {
    return reply.send({ status: 500, message: error });
  }
}



module.exports = {
    add
}
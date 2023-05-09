const rabbitmqLib = require("../configs/rabbitmq-connection");
const { emitter } = require("../utils/events");
const { v4: uuidv4 } = require("uuid");

async function add(req, reply) {
  const { name, image, type, price, description } = req.body;
  try {
    rabbitmqLib.PublishMessage(
        "headlessExchange",
        "catalog.add",
        Buffer.from(JSON.stringify({name, image, price, type, description})),
        {
            correlationId: '334',
            token: 'ddkf'
        }
    )
  } catch (error) {
    return reply.send({ status: 500, message: error });
  }
}

module.exports = {
    add
}
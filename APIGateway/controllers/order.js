const rabbitmqLib = require("../configs/rabbitmq-connection");
const { v4: uuidv4 } = require("uuid");

async function checkout(req, reply) {
  const {name, email, address, productId} = req.body;
  const reqId = uuidv4();
  const owner = req.user.email;
  try {
    const response = await rabbitmqLib.PublishMessage(
      "headlessExchange",
      "order.checkout",
      Buffer.from(
        JSON.stringify({name, email, address, productId })
      ),
      {
        correlationId: reqId,
      }
    );
    return reply.status(response.status.code).send(response);
  } catch (error) {
    return reply.send({ status: 500, message: error });
  }
}

module.exports = {
  checkout,
};

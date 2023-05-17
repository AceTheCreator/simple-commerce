const rabbitmqLib = require("../configs/rabbitmq-connection");
const { v4: uuidv4 } = require("uuid");

async function add(req, reply) {
  const { name, image, type, price, description } = req.body;
  const owner = req.user.email;
  const reqId = uuidv4();
  try {
    const response = await rabbitmqLib.PublishMessage(
      "headlessExchange",
      "catalog.add",
      Buffer.from(
        JSON.stringify({ name, image, price, type, description, owner })
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

async function getProducts(req, reply) {
  const username = req.user.email;
  const reqId = uuidv4();
  try {
    const response = await rabbitmqLib.PublishMessage(
      "headlessExchange",
      "catalog.products",
      Buffer.from(JSON.stringify({ username })),
      {
        correlationId: reqId,
      }
    );
    return reply.status(response.status.code).send(response);
  } catch (error) {
    return reply.send({ status: 500, message: error });
  }
}

async function getProduct(req, reply) {
  const reqId = uuidv4();
  const productId = req.params.id;
  try {
    const response = await rabbitmqLib.PublishMessage(
      "headlessExchange",
      "catalog.product",
      Buffer.from(JSON.stringify({ id: productId })),
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
  add,
  getProducts,
  getProduct,
};

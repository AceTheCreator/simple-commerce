const fastify = require("../index");
const rabbitmqLib = require("../configs/rabbitmq-connection");
const { v4: uuidv4 } = require("uuid");

async function signup(req, reply) {
  const { displayName, email, password } = req.body;
  const reqId = uuidv4();
  try {
    // publish an event
    const response = await rabbitmqLib.PublishMessage(
      "headlessExchange",
      "user.signup",
      Buffer.from(JSON.stringify({ displayName, email, password, reqId })),
      {
        correlationId: reqId,
      }
    );
    if (response.status.code === 200) {
      const token = fastify.fastify.jwt.sign({ email });
      response.token = token;
    }
    return reply.status(response.status.code).send(response);
  } catch (error) {
    return reply.send({ status: 500, message: error });
  }
}

async function login(req, reply) {
  const { email, password } = req.body;
  const reqId = uuidv4();

  try {
    const response = await rabbitmqLib.PublishMessage(
      "headlessExchange",
      "user.login",
      Buffer.from(JSON.stringify({ email, password, reqId }))
    );
    if (response.status.code === 200) {
      const token = fastify.fastify.jwt.sign({ email });
      response.token = token;
    }
    return reply.status(response.status.code).send(response);
  } catch (error) {
    console.log(error);
    return reply.send({ status: 500, message: error });
  }
}

module.exports = {
  signup,
  login,
};

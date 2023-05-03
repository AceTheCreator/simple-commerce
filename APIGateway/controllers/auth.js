const rabbitmqLib = require("../configs/rabbitmq-connection");
const { emitter } = require("../utils/events");
const { v4: uuidv4 } = require('uuid');

function fnConsumer(msg, callback) {
  const message = msg.content.toString();
  const parsedMessage = JSON.parse(message);
  callback(true);
  emitter(parsedMessage.reqId, message);
}

async function signup(req, reply) {
  const { displayName, email, password } = req.body;
  const reqId = uuidv4();
  try {
    // publish an event
    const response = await rabbitmqLib.PublishMessage(
      "headlessExchange",
      "user.signup",
      Buffer.from(JSON.stringify({ displayName, email, password, reqId }))
    );
    if (response.status !== 200 || response.status !== 201) {
      return reply.status(response.status.code).send(response.status.message);
    } else {
      return reply.send({
        status: response.status.code,
        message: response.status.message,
      });
    }
  } catch (error) {
    return reply.send({ status: 500, message: error });
  }
}

async function login(req, reply){
  const {email, password} = req.body;
  const reqId = uuidv4();

  try {
    const response = await rabbitmqLib.PublishMessage(
      "headlessExchange",
      "user.login",
      Buffer.from(JSON.stringify({ email, password, reqId }))
    );
    if (response.status !== 200 || response.status !== 201) {
      return reply.status(response.status.code).send(response.status.message);
    } else {
      return reply.send({
        status: response.status.code,
        message: response.status.message,
      });
    }
  } catch (error) {
        return reply.send({ status: 500, message: error });
  }
}

module.exports = {
  signup,
  login,
  fnConsumer
};

const rabbitmqLib = require("../configs/rabbitmq-connection");
const { emitter } = require("../utils/events");

function fnConsumer(msg, callback) {
  const message = msg.content.toString();
  const parsedMessage = JSON.parse(message)
  callback(true);
  emitter(parsedMessage.reqId, message)
}

async function signup(req, reply) {
  const { displayName, email, password, reqId } = req.body;
  try {
    // publish an event
   const response = await rabbitmqLib.PublishMessage(
      "userExchange",
      "user.signup",
      Buffer.from(JSON.stringify({ displayName, email, password, reqId }))
    );
    console.log(response)
  } catch (error) {
    console.log(error)
    return reply.send({ status: 500, message: error });
  }
  // reply.send({ status: 200, message: "Signup successful" });
}

module.exports = {
  signup,
  fnConsumer
};

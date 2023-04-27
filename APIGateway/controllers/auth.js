const rabbitmqLib = require("../configs/rabbitmq-connection");

let msgPayload = null

// function fnConsumer(msg, callback) {
//   const message = msg.content.toString();
//   msgPayload = message
//   callback(true);
// }

// rabbitmqLib.ConsumeMessage("user", "userExchange", "", fnConsumer);

// console.log(msgPayload)

function fnConsumer(msg, callback) {
  const message = msg.content.toString();
  global.message = message;
  callback(true);
}

async function signup(req, reply) {
  const { displayName, email, password, reqId } = req.body;
  try {
    rabbitmqLib.PublishMessage(
      "userExchange",
      "user.signup",
      Buffer.from(JSON.stringify({ displayName, email, password, reqId }))
    );
    console.log(global.message)
    reply.send({ status: 200, message: "Signup successful" });
  } catch (error) {
    return reply.send({ status: 500, message: error });
  }
  // reply.send({ status: 200, message: "Signup successful" });
}

module.exports = {
  signup,
  fnConsumer
};

const rabbitmqLib = require("../configs/rabbitmq-connection");


 async function signup(req, reply) {
  const { displayName, email, password, reqId } = req.body;
  try {
    rabbitmqLib.PublishMessage(
      "userExchange",
      "user.login",
      Buffer.from(JSON.stringify({ displayName, email, password, reqId }))
    );
    rabbitmqLib.ConsumeMessage("user", "userExchange", "user.queue", fnConsumer);
    function fnConsumer(msg, callback) {
      const message = msg.content.toString();
      console.log(message)
      callback(true);
    }
  } catch (error) {
    return reply.send({ status: 500, message: error });
  }
  reply.send({ status: 200, message: "Signup successful" });
};

module.exports = {
    signup
}

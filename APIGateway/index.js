const fastify = require("fastify")();
const rabbitmqLib = require("./configs/rabbitmq-connection");

function fnConsumer(msg, callback) {
  console.log("Received message: ", msg.content.toString());
  // we tell rabbitmq that the message was processed successfully
  callback(true);
}

// InitConnection of rabbitmq
rabbitmqLib.InitConnection(() => {
  rabbitmqLib.StartConsumer('user', fnConsumer)
  rabbitmqLib.StartPublisher();
});
fastify.post("/signup", async (req, res) => {
  const {
    displayName,
    email,
    password
  } = req.body
  try {
    rabbitmqLib.PublishMessage(
      "userExchange",
      "user.signup",
      Buffer.from(JSON.stringify({displayName, email, password}))
    );
  } catch (error) {
    return res.send({ status: 500, message: error });
  }
  res.send({status:200, message:"Signup successful"});
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(5000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

const fastify = require("fastify")();
const rabbitmqLib = require("./configs/rabbitmq-connection");
const FastifySSE = require("fastify-sse");
const authRoutes = require("./routes/auth");
const catalogRoutes = require("./routes/catalog");
const jwt = require("fastify-jwt");
const { emitter } = require("./utils/events");

fastify.register(jwt, {
  secret: "littlesecrete", // use .env for this
});
fastify.register(authRoutes);
fastify.register(catalogRoutes);

fastify.register(require("@fastify/cors"), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true,
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      console.log("test cors headers");
      corsOptions.origin = false;
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions);
  };
});

  fastify.decorate("jwtauthentication", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });


  function fnConsumer(msg, callback) {
    const message = msg.content.toString();
    const parsedMessage = JSON.parse(message);
    callback(true);
    emitter(parsedMessage.reqId, message);
  }

// InitConnection of rabbitmq
rabbitmqLib.InitConnection(() => {
  rabbitmqLib.StartPublisher();
  rabbitmqLib.StartConsumer("log", fnConsumer);
  rabbitmqLib.StartConsumer("catalog", fnConsumer);
});

fastify.get(
  "/",
  {
    preValidation: [fastify.jwtauthentication],
  },
  async function (req, res) {
    res.status(200).send({ msg: "Success" });
  }
);

fastify.get(
  "/events",
  {
    // Set the option "keepAliveTimeout" to infinity to prevent the server from closing the connection.
    // This is necessary to allow the client to continue receiving events.
    keepAliveTimeout: 0,
  },
  (req, reply) => {
    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    // Send an initial event to the client
    const eventDetails = {
      message: "This is a server-sent event",
      timestamp: new Date().toISOString(),
    };
    console.log(eventDetails);
    reply.sse('data: { "message": "Connected" }\n\n');
  }
);

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

exports.fastify = fastify;

const fp = require("fastify-plugin");

module.exports = function (fastify) {
  fastify.decorate("jwtauthentication", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
};

const CatalogController = require("../controllers/catalog");

module.exports = function (fastify, _, next) {

  fastify.post(
    "/product/add",
    {
      preValidation: [fastify.jwtauthentication],
    },
    async function (request, reply) {
      return request.user;
    }
  );
  next();
};

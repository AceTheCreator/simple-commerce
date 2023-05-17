const CatalogController = require("../controllers/catalog");

module.exports = function (fastify, _, next) {
  fastify.post(
    "/product/add",
    {
      preValidation: [fastify.jwtauthentication],
    },
    CatalogController.add
  );
  fastify.get(
    "/product/all",
    {
      preValidation: [fastify.jwtauthentication],
    },
    CatalogController.getProducts
  );
  fastify.get("/product/:id", {
    preValidation: [fastify.jwtauthentication],
  },
  CatalogController.getProduct
  );
  next();
};

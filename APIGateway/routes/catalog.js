const CatalogController = require("../controllers/catalog");

module.exports = function (fastify, _, next) {
  fastify.post("/product/add", {}, CatalogController.add);
  next();
};

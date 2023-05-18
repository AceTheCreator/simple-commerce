const Order = require('../controllers/order')

module.exports = function (fastify, _, next) {
  fastify.post("/order/checkout", {
    preValidation: [fastify.jwtauthentication]
  }, Order.checkout);
  next();
};

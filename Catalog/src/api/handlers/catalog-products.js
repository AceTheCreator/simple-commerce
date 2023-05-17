const Product = require("../schemas/Product");
const handler = (module.exports = {});
const reqPayload = {};
/**
 *
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.username - user/shop name
 */
handler.requestCatalogs = async ({ message }) => {
  const msgPayload = message.payload;
  reqPayload.reqId = message.headers.correlationId;
  const getProducts = await Product.find({ owner: msgPayload.username });
  if (Object.keys(getProducts).length) {
    reqPayload.status = {
      code: 200,
      message: "Products found",
    };
    reqPayload.data = getProducts;
    message.reply(reqPayload, {}, "log/catalog");
  } else {
    reqPayload.status = {
      code: 400,
      message: "This user has no products",
    };
    message.reply(
      reqPayload,
      {
        correlationId: "message.headers.correlationId",
      },
      "log/catalog"
    );
  }
};
/**
 *
 * @param {object} options
 * @param {object} options.message
 */
handler.retrieveProducts = async ({ message }) => {
  // Implement your business logic here...
};

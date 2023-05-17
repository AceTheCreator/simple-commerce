const Product = require("../schemas/Product");
const handler = (module.exports = {});
const reqPayload = {};
/**
 *
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.id - A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
 */
handler.requestCatalog = async ({ message }) => {
  const msgPayload = message.payload;
  reqPayload.reqId = message.headers.correlationId;
  const getProduct = await Product.findById(msgPayload.id);
  if (getProduct) {
    reqPayload.status = {
      code: 200,
      message: "Product not found",
    };
    reqPayload.data = getProduct;
    message.reply(reqPayload, {}, "log/catalog");
  } else {
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
 * @param {string} options.message.headers.correlationId - Correlation ID set by application
 * @param {string} options.message.payload.owner - product owner
 * @param {string} options.message.payload.name - product name
 * @param {string} options.message.payload.image - product image
 * @param {string} options.message.payload.type - type of product
 * @param {integer} options.message.payload.price - product type
 * @param {string} options.message.payload.description - about the product
 */
handler.recieveCatalog = async ({ message }) => {

};

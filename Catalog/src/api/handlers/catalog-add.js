const Product = require("../schemas/Product");
const hermes = require("../index");
const handler = (module.exports = {});
const resPayload = {};

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
handler.addCatalog = async ({ message }) => {
  const msgPayload = message.payload;
  resPayload.reqId = message.headers.correlationId
  const getCatalog = await Product.findOne({
    name: msgPayload.name,
    owner: msgPayload.owner,
  });
  if (getCatalog) {
    resPayload.status = {
      code: 400,
      message: "A product with that name already exists",
    };
  } else {
    const newCatalog = new Product(msgPayload);
    await newCatalog.save();
    resPayload.status = {
      code: 200,
      message: "Successfully added a new product",
    };
  }
     hermes.app.send(resPayload, {}, "log/catalog");
};

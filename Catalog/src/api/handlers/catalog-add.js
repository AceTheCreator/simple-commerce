
const handler = module.exports = {};
const hermes = require("../index");
const Catalog = require("../schemas/Product");

/**
 * 
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.headers.correlationId - Correlation ID set by application
 * @param {string} options.message.payload.name - product name
 * @param {string} options.message.payload.image - product image
 * @param {string} options.message.payload.type - type of product
 * @param {integer} options.message.payload.price - product type
 * @param {string} options.message.payload.description - about the product
 */
handler.addCatalog = async ({message}) => {
console.log(message)
  // Implement your business logic here...
};

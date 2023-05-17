
const handler = module.exports = {};

/**
 * 
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.id - A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
 */
handler.requestCatalog = async ({message}) => {
  // Implement your business logic here...
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
handler.recieveCatalog = async ({message}) => {
  // Implement your business logic here...
};

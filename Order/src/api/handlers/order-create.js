
const handler = module.exports = {};

/**
 * 
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.headers.correlationId - Correlation ID
 * @param {string} options.message.payload.productId - unique identify for product
 * @param {string} options.message.payload.name - Buyer&#39;s name
 * @param {string} options.message.payload.email - buyer email
 * @param {string} options.message.payload.address - shipping addres
 */
handler.create = async ({message}) => {
  // Implement your business logic here...
};


const handler = module.exports = {};

/**
 * 
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.headers.correlationId - Correlation ID set by application
 * @param {object} options.message.headers.headers

 * @param {string} options.message.payload.id - product unique identifier
 */
handler.updateCatalog = async ({message}) => {
  // Implement your business logic here...
};

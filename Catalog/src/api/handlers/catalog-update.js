
const handler = module.exports = {};

/**
 * 
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.headers.correlationId - Correlation ID set by application
 * @param {string} options.message.headers.token - A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
 * @param {string} options.message.payload.id - A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
 */
handler.update = async ({message}) => {
  // Implement your business logic here...
};

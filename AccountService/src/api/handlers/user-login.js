
const handler = module.exports = {};

/**
 * 
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.reqId - A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
 * @param {string} options.message.payload.email - Email of the user
 * @param {string} options.message.payload.password - Password of the user
 */
handler.login = async ({message}) => {
  // Implement your business logic here...
};

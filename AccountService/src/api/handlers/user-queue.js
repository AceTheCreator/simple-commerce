
const handler = module.exports = {};

/**
 * 
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.reqId - A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
 * @param {object} options.message.payload.status
 * @param {integer} options.message.payload.status.code
 * @param {string} options.message.payload.status.message
 */
handler.userQueue = async ({message}) => {
  console.log('hola')
  // Implement your business logic here...
};

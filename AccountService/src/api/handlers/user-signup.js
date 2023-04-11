
const handler = module.exports = {};

/**
 * 
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.displayName - Name of the user
 * @param {string} options.message.payload.email - Email of the user
 * @param {string} options.message.payload.password - Password of the user
 */
handler.signup = async ({message}) => {
  message.reply(message.payload, {}, 'user/queue')
  // Implement your business logic here...
};

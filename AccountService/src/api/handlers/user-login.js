
const handler = module.exports = {};

/**
 * 
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.email - Email of the user
 */
handler.login = async ({message}) => {
  message.topic = "user/queue"
  message.payload = {test: "ok"}
  message.send(message)
  // message.reply(message.payload, {}, 'user/queue');
  // Implement your business logic here...
};

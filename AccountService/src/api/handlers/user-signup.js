const handler = (module.exports = {});
const hermes = require("../index");

/**
 *
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.displayName - Name of the user
 * @param {string} options.message.payload.email - Email of the user
 * @param {string} options.message.payload.password - Password of the user
 */
handler.signup = async ({ message, next }) => {
  console.log(hermes)
  const payload = {
    reqId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    status: {
      code: 200,
      message: "successful",
    },
  };

  hermes.app.send(payload, {}, "user/queue");
  // message.topic = 'user/queue'
  // message.headers = {
  //   ...message.headers,
  //   routingKey: "user.queue"
  // }
  // message.payload = {
  //   reqId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  //   status: {
  //     code: 200,
  //     message: "successfull",
  //   },
  // };
  // message.send(message.payload, {}, 'user/queue');
  // Implement your business logic here...
};

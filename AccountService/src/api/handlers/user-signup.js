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
  const payload = {
    reqId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    token: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    status: {
      code: 200,
      message: "successful",
    },
  };
  hermes.app.send(
    payload,
    {
      correlationId: "162636",
    },
    "user/queue"
  );
};

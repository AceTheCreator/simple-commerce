const handler = (module.exports = {});
const hermes = require("../index");
const User = require("../schemas/User");
const bcrypt = require("bcryptjs");

const reqPayload = {};

/**
 *
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.reqId - A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems.
 * @param {string} options.message.payload.email - Email of the user
 * @param {string} options.message.payload.password - Password of the user
 */
handler.login = async ({ message }) => {
  const msgPayload = message.payload;
  reqPayload.reqId = msgPayload.reqId;
  const getUser = await User.findOne({ email: msgPayload.email });
  if (getUser) {
    const comparePassword = bcrypt.compareSync(
      msgPayload.password,
      getUser.password
    );
    if (comparePassword) {
      reqPayload.status = {
        code: 200,
        message: "Login successful",
      };
    } else {
      reqPayload.status = {
        code: 400,
        message: "Email/Password is incorrect",
      };
    }
  } else {
    reqPayload.status = {
      code: 400,
      message: "Email/Password is incorrect",
    };
  }
  hermes.app.send(reqPayload, {}, "log/users");
  // Implement your business logic here...
};

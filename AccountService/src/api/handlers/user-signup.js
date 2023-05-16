const handler = (module.exports = {});
const hermes = require("../index");
const User = require("../schemas/User");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const reqPayload = {};

/**
 *
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.displayName - Name of the user
 * @param {string} options.message.payload.email - Email of the user
 * @param {string} options.message.payload.password - Password of the user
 */
handler.signup = async ({ message, next }) => {
  console.log(message)
  const msgPayload = message.payload;
  reqPayload.reqId = msgPayload.reqId;
  const reqId = uuidv4();
  const getUser = await User.findOne({ email: msgPayload.email });

  if (getUser) {
    reqPayload.status = {
      code: 400,
      message: "User already exists",
    };
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(msgPayload.password, salt);
    const newUser = new User({
      email: msgPayload.email,
      displayName: msgPayload.displayName,
      password: hash,
      token: reqId,
    });
    await newUser.save();
    reqPayload.token = newUser.token;
    reqPayload.status = {
      code: 200,
      message: "Successfully created a new user",
    };
    hermes.app.send(
      {
        email: newUser.email,
        displayName: newUser.displayName,
      },
      {},
      "notify/welcome"
    );
  }
  message.reply(
    reqPayload,
    {
      correlationId: message.headers.correlationId,
      headers: { myKey: "myValue" },
    },
    "log/users"
  );
};

const handler = (module.exports = {});
const postmark = require("postmark");

const client = new postmark.ServerClient(
  "41d3e213-28c1-4536-b711-d2795da8df8d"
);

/**
 *
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.payload.email
 * @param {string} options.message.payload.displayName
 */
handler.welcome = async ({ message }) => {
  const payload = message.payload;
  client.sendEmailWithTemplate({
    From: "azeez.elegbede@postman.com",
    To: payload.email,
    TemplateAlias: "welcome",
    TemplateModel: {
      product_url: "headless.com",
      product_name: "Headless Commerce",
      name: payload.displayName,
      sender_name: "Headless team",
    },
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  });
};

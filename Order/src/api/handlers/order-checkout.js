const handler = (module.exports = {});
const Paystack = require("paystack")(
  "sk_test_9c741c4779b7619e155b7cc9a14512f8091720aa"
);
const Products = require("../schemas/Product");
const reqPayload = {};
/**
 *
 * @param {object} options
 * @param {object} options.message
 * @param {string} options.message.headers.correlationId - Correlation ID
 * @param {string} options.message.payload.productId - unique identify for product
 * @param {string} options.message.payload.name - Buyer&#39;s name
 * @param {string} options.message.payload.email - buyer email
 * @param {string} options.message.payload.address - shipping addres
 */
handler.checkout = async ({ message }) => {
  const msgPayload = message.payload;
  reqPayload.reqId = message.headers.correlationId;
  let refCode = null;
  const getProduct = await Products.findById(msgPayload.productId);
  if (getProduct) {
    Paystack.transaction
      .initialize({
        email: msgPayload.email,
        amount: getProduct.price * 100,
      })
      .then((body) => {
        // send the authorization_url in the response to the client to redirect them to
        // the payment page where they can make the payment
        if (body.data) {
          console.log(refCode)
          reqPayload.data = body.data;
          reqPayload.status = {
            code: 200,
            message: "Checkout link generated successfully",
          };
        } else {
          reqPayload.status = {
            code: 400,
            message: body.message,
          };
        }
        message.reply(reqPayload, {}, "log/order");
      });
  } else {
    reqPayload.status = {
      code: 400,
      message: "Failed to process payment request",
    };
  }
  message.reply(reqPayload, {}, "log/order");

};

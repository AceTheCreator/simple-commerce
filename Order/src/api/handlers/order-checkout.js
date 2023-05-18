const handler = (module.exports = {});
const Paystack = require("paystack")(
  "sk_test_9c741c4779b7619e155b7cc9a14512f8091720aa"
);

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
  Paystack.transaction
    .initialize({
      email: "customer@email.com",
      amount: 10000, // in kobo
    })
    .then(function (body) {
      // send the authorization_url in the response to the client to redirect them to
      // the payment page where they can make the payment
      refCode = body.data.reference;
      reqPayload.data = body.data.authorization_url;
      reqPayload.status = {
        code: 200,
        message: "Checkout link generated successfully",
      };
      message.reply(reqPayload, {}, "log/order");
    });
  // setTimeout(() => {
  //   Paystack.transaction.verify(refCode).then((res) => {
  //     // console.log(res);
  //   });
  // }, [1000]);
};

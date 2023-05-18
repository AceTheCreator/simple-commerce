const Paystack = require("paystack")(
  "sk_test_9c741c4779b7619e155b7cc9a14512f8091720aa"
);
const Products = require("../schemas/Product");
const Order = require("../schemas/Order");
const handler = (module.exports = {});
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
handler.create = async ({ message }) => {
  const {name, email, address, productId} = message.payload;
  reqPayload.reqId = message.headers.correlationId;
  const paymentRef = message.headers.headers.paymentRef;
  reqPayload.reqId = message.headers.correlationId;
  Paystack.transaction.verify(paymentRef).then(async (res) => {
    if (res.status) {
      const data = res.data;
      if (data.status === "abandoned" || data.status === "failed") {
        reqPayload.status = {
          code: 400,
          message: data.gateway_response,
        };
      }else{
        const getProduct = await Products.findById(productId);
        if(getProduct){
          const newOrder = new Order({
            name: getProduct.name,
            description: getProduct.description,
            email,
            address,
            customerName: name,
            vendorEmail: getProduct.owner,
            price: data.amount / 100,
            currency: data.currency,
          });
          await newOrder.save();
          reqPayload.status = {
            code: 200,
            message: "Order successfully created",
          };
          // trigger notification for orders
        }
      }
    }
    message.reply(reqPayload, {}, "log/order");
  });
};

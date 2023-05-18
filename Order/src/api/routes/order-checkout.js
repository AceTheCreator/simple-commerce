const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const orderCheckoutHandler = require('../handlers/order-checkout');
module.exports = router;



router.use('order/checkout', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'order/checkout','checkoutProduct','publish');
    await orderCheckoutHandler.checkout({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

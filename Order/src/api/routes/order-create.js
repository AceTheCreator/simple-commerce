const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const orderCreateHandler = require('../handlers/order-create');
module.exports = router;



router.use('order/create', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'order/create','create','publish');
    await orderCreateHandler.create({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

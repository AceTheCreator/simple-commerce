const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const logOrderHandler = require('../handlers/log-order');
module.exports = router;



router.use('log/order', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'log/order','orderLogs','publish');
    await logOrderHandler.orderLog({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

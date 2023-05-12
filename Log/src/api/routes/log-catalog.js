const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const logCatalogHandler = require('../handlers/log-catalog');
module.exports = router;



router.use('log/catalog', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'log/catalog','productLogs','publish');
    await logCatalogHandler.productLog({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

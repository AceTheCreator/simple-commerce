const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const catalogUpdateHandler = require('../handlers/catalog-update');
module.exports = router;



router.use('catalog/update', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'catalog/update','update','publish');
    await catalogUpdateHandler.update({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

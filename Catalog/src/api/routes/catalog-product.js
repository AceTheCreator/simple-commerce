const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const catalogProductHandler = require('../handlers/catalog-product');
module.exports = router;



router.use('catalog/product', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'catalog/product','getProduct','publish');
    await catalogProductHandler.requestCatalog({message});
    next();
    
  } catch (e) {
    next(e);
  }
});
router.useOutbound('catalog/product', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'catalog/product','retrieveProduct','subscribe');
    await catalogProductHandler.recieveCatalog({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

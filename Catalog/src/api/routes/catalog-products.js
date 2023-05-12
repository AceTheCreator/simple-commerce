const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const catalogProductsHandler = require('../handlers/catalog-products');
module.exports = router;



router.use('catalog/products', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'catalog/products','getProducts','publish');
    await catalogProductsHandler.requestCatalogs({message});
    next();
    
  } catch (e) {
    next(e);
  }
});
router.useOutbound('catalog/products', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'catalog/products','recieveProducts','subscribe');
    await catalogProductsHandler.retrieveProducts({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

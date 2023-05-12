const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const catalogAddHandler = require('../handlers/catalog-add');
module.exports = router;



router.use('catalog/add', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'catalog/add','addProduct','publish');
    await catalogAddHandler.addCatalog({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

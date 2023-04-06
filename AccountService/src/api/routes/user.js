const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const userHandler = require('../handlers/user');
module.exports = router;



router.use('user', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'user','','publish');
    await userHandler.user({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

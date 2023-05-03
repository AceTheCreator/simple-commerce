const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const notifyWelcomeHandler = require('../handlers/notify-welcome');
module.exports = router;



router.use('notify/welcome', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'notify/welcome','welcomeMessage','publish');
    await notifyWelcomeHandler.welcome({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

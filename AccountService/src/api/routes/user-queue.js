const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const userQueueHandler = require('../handlers/user-queue');
module.exports = router;



router.useOutbound('user/queue', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'user/queue','userQueue','subscribe');
    await userQueueHandler.userQueue({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

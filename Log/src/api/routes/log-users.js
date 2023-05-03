const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const logUsersHandler = require('../handlers/log-users');
module.exports = router;



router.use('log/users', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'log/users','userLogs','publish');
    await logUsersHandler.userlog({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

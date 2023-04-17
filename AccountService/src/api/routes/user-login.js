const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const userLoginHandler = require('../handlers/user-login');
module.exports = router;



router.use('user/login', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'user/login','userLogIn','publish');
    await userLoginHandler.login({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

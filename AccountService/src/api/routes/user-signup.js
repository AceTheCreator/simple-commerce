const Router = require('hermesjs/lib/router');
const {validateMessage} = require('../../lib/message-validator');
const router = new Router();
const userSignupHandler = require('../handlers/user-signup');
module.exports = router;



router.use('user/signup', async (message, next) => {
  try {
    
    await validateMessage(message.payload,'user/signup','userSignUp','publish');
    await userSignupHandler.signup({message});
    next();
    
  } catch (e) {
    next(e);
  }
});

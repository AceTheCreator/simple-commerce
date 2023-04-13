const AuthController = require('../controllers/auth');

module.exports = function(fastify, _, next){
    fastify.post('/signup', {}, AuthController.signup);
    next()
}

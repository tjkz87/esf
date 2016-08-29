var userController = require('../users/userController');

module.exports = function(app, express) {
  app.post('/api/users/info', userController.getInfo);
};
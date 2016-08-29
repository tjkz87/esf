var userController = require('../users/userController');
var invoiceController = require('../invoices/invoiceController');

module.exports = function(app, express) {
  app.post('/api/users/info', userController.getInfo);
  app.post('/api/users/session', userController.createSession);

  app.get('/api/invoices/query', invoiceController.query);
};
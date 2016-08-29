var soap = require('soap');
var soapClient = require('./userSoap');

module.exports = {
  getInfo: function(req, res, next) {
    // Request body example:
    // {
    // "username": "[ESF username (IIN)]",
    // "password": "[ESF password]",
    // "data": {
    //     "tin": "[use IIN]",
    //     "x509Certificate": "[user's public certificate (PEM)]"
    //   }
    // }
    soapClient(function(client) {
      // set security headers
      client.setSecurity(new soap.WSSecurity(req.body.username, req.body.password, {
        hasTimeStamp: false,
        hasTokenCreated: false
      }));
      // call SOAP API
      client.SessionService.SessionServicePort.getUser(req.body.data, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }, {rejectUnauthorized: false});
    });
  },
  createSession: function(req, res, next) {

  }
}
var soap = require('soap');
var soapClient = require('./invoiceSoap');

var client;

soapClient(function(cl) {
  client = cl;
  console.log('InvoiceService SOAP client loaded.')
});

module.exports = {
  query: function(req, res, next) {
    // call SOAP API
    // ---------- Request body example:----------
    // order is important!
    // {
    //   "sessionId": "[ESF username (IIN or BIN)]",
    //   "criteria": {
    //     "direction": "[INBOUND or OUTBOUND]", //required
    //     "contragentTin": "[BIN or IIN]",
    //     "dateFrom": [timestamp],
    //     "dateTo": [timestamp],
    //     "invoiceStatus": [],
    //     "invoiceType": [],
    //     "orderBy": [],
    //     "asc": [true or false],  //required
    //     "pageNum": []
    //   }
    // }
    // ------------------------------------------
    var queryParams = {
      sessionId: req.query.sessionId,
      criteria: {
        direction: req.query.direction
      }
    }

    if (req.query.contragentTin) { queryParams.criteria.contragentTin = req.query.contragentTin }
    if (req.query.dateFrom) { queryParams.criteria.dateFrom = req.query.dateFrom }
    if (req.query.dateTo) { queryParams.criteria.dateTo = req.query.dateTo }
    if (req.query.invoiceStatus) { queryParams.criteria.invoiceStatus = req.query.invoiceStatus }
    if (req.query.invoiceType) { queryParams.criteria.invoiceType = req.query.invoiceType }
    if (req.query.orderBy) { queryParams.criteria.orderBy = req.query.orderBy }
    queryParams.criteria.asc = req.query.asc;
    if (req.query.pageNum) { queryParams.criteria.pageNum = req.query.pageNum }

    client.queryInvoice(queryParams, function(err, result) {
      if (err) { return res.send(err); }
      res.send(result);
    }, {rejectUnauthorized: false});
  }
}
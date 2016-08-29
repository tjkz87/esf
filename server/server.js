var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

app.listen(port, function() {
  console.log('Listening on port:', port);
});

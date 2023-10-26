var express = require('express');
var bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');

const port = process.env.PORT || 3000;

var app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app
  .use(cors())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'));


app
  .use(bodyParser.json())
 
  .use('/', require('./routes'));

  process.on('uncaughtException', (err,origin) => {
    console.log(process.stderr.fd,`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });
  
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
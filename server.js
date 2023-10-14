var express = require('express');
var bodyParser = require('body-parser');
const mongodb = require('./db/connect');
// const cors = require('cors');

const port = process.env.PORT || 3000;

var app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


// app.listen(3000, () => {
//     console.log(`Server is running on port ${port}`);

// })
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  // .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'));

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
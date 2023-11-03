const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Cars Inventory API',
    description: 'Cars Inventory API Personal Assignment 07',
  },
//   to test locally write localhost:3000
  host: 'cse-341kp07.onrender.com', 
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// ...

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
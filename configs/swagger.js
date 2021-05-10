var express = require('express');
var router = express.Router();
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Express API',
    version: '1.0.0',
    description: 'Express API Documentation',
  },
  host: 'localhost:' + 8080,
  basePath: '/',
  schemes: ['http']
}

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['routes/*.js']
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
// serve swagger
router.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//export this router to use in our app.js
module.exports = router;



const expressJSDocSwagger = require('express-jsdoc-swagger');

function fnConfigSwagger(app,baseUrl){
    const oSwaggerConfig = {
        info: {
          version: '1.0.0',
          title: 'Sales order manage',
          license: {
            name: 'MIT',
          },
        },
        security: {
          BasicAuth: {
            type: 'http',
            scheme: 'basic',
          },
        },
        baseDir: './',
        filesPattern: ['./router/**.js'], // Glob pattern to find your jsdoc files
        swaggerUIPath: '/doc', // SwaggerUI will be render in this url. Default: '/api-docs'
      };
      expressJSDocSwagger(app)(oSwaggerConfig);
}

module.exports = {
    fnConfigSwagger
}
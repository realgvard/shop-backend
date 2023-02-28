'use strict';
const products = require('../../mocks/products.json');

module.exports.handler = () => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(products.default)
  };
};

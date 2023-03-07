'use strict';
const products = require('../../mocks/products.json');

module.exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(products),
  };
};
